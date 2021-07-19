import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationPageProps } from './ApplicationPage';
import { AssetInfo, CreateApplicationState, ApplicationPersonalInfo, ApplicationBusinessInfo } from '../../../modules/types';
import { useLocation, useHistory } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { TopBarProps, defaultProps } from '../../organisms/TopBar/TopBar';
import { Profile } from '../../../modules/profile/types';
import { Quote, QuoteOption } from '../../../modules/quote/types';
import { CreateApplicationPayload, Term } from '../../../modules/application/types';

export type ApplicationPagePresenterProps = ApplicationPageProps & {
  createApplication: (payload: CreateApplicationPayload) => Promise<APIResponse<void>>;
  profile: Profile | null;
};

const withPresenter = (
    View: React.FC<ApplicationPageProps>,
  ): React.FC<ApplicationPagePresenterProps> => {
    const Presenter: React.FC<ApplicationPagePresenterProps> = (props) => {
    const {
      createApplication,
      profile,
    } = props;

    const { t } = useTranslation();
    const history = useHistory();
    const { state: locationState, pathname } = useLocation<CreateApplicationState | undefined>();

    const [state, setState] = useState<CreateApplicationState>({
      currentStep: 1,
      totalSteps: 6,
    });

    useEffect(() => {
      if(locationState) {
        setState({
          ...state,
          ...locationState,
        });
      }
    }, [locationState]);

    const {
      currentStep,
      totalSteps,
      quoteDetails,
      quoteSelected,
      personalInfo,
      businessInfo,
      assetInfo,
      creditCheckConsent,
    } = state;

    const setQuoteSelected = (quoteDetails: Quote, quoteSelected: QuoteOption) => {
      const newState = {
        currentStep: 1,
        totalSteps: 5,
        quoteDetails,
        quoteSelected,
      }
      setState(newState);
      // TODO
      history.push('/portal/application/businessInfo', newState);
      // history.push('/portal/application/personalInfo', newState);
    }

    const setPersonalInfo = (personalInfo: ApplicationPersonalInfo) => {
      const newState = {
        ...state,
        currentStep: currentStep + 1,
        personalInfo,
      }
      setState(newState);
      history.push('/portal/application/businessInfo', newState);
    }

    const setBusinessInfo = (businessInfo: ApplicationBusinessInfo) => {
      const newState = {
        ...state,
        currentStep: currentStep + 1,
        businessInfo,
      }
      setState(newState);
      history.push('/portal/application/assetInfo', newState);
    }

    const setAssetInfo = (assetInfo: AssetInfo) => {
      const newState = {
        ...state,
        currentStep: currentStep + 1,
        assetInfo,
      }
      setState(newState);
      history.push('/portal/application/reviewApplicationInfo', newState);
    }

    const setCreditCheckConsent = (creditCheckConsent: boolean) => {
      const newState = {
        ...state,
        currentStep: currentStep + 1,
        creditCheckConsent,
      }
      setState(newState);
      history.push('/portal/application/termsOfApplication', newState);
    }

    // window.onbeforeunload = (event) => {
    //     const e = event || window.event;
    //     e.preventDefault();
    //     if (e) {
    //       e.returnValue = ''
    //     }
    //     return '';
    // };
    
    const handleBackButtonClicked = () => {
      // setStepperCurrentValue(stepperCurrentValue - 1);
      // switch (location.pathname){
      //   case (routes.assetInformation):
      //     history.push(routes.quoteSelection);
      //     break;
      //   case (routes.businessType):
      //     history.push(routes.assetInformation);
      //     break;
      //   case (routes.reviewApplicationInformation):
      //     history.push(routes.businessType);
      //     break;
      //   case (routes.termsOfApplication):
      //     history.push(routes.reviewApplicationInformation);
      //     break;
      //   default:
      //     history.push(routes.invalid);
      //     break;
      // }
    }

    let topBar: TopBarProps = {};
    if (location.pathname !== 'routes.quoteSelection' || totalSteps < 5){
      topBar = {
        backButton: {
          ...defaultProps.backButton,
          icon: {
            ...defaultProps.backButton.icon,
            onIconClicked: handleBackButtonClicked,
          },
          text:{
            ...defaultProps.backButton.text,
            value: t('application_form.back'),
          }
        },
        show: true,
      }
    }

    const handleCreateApplication = async () => {
      if (quoteSelected && assetInfo && businessInfo && creditCheckConsent && quoteDetails && profile){
        const { 
          portalId, 
          operatingName, 
          name, 
          street, 
          city, 
          companyName, 
          operatingSinceDate, 
          email, 
          phone, 
          website, 
          province, 
          postalCode,
        } = profile;
        const { term } = quoteSelected
        const {assetCondition, ageOfAsset, expectedDeliveryDate} = assetInfo;
        const { businessType, sin, dob, bankruptcy, bankruptcyDetails} = businessInfo;
        const { applicationAmount, asset, quoteId } = quoteDetails;
       
        const checkYearsInBusiness = () => {
          const date = new Date(operatingSinceDate); 
          const diffTime = Date.now() - date.getTime();
          const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365); 
          return diffYears;
        }
        await createApplication({
          leasePortalId: portalId,
          operatingName: operatingName,
          businessName: companyName,
          businessType: businessType === "Incorporated" ? "Incorporated" : "Proprietorship",
          yearsInBusiness: checkYearsInBusiness(),
          contactName: name,
          contactEmail: email,
          contactPhone: phone,
          contactWebsite: website,
          street: street,
          city: city,
          province: province,
          postalCode: postalCode,
          term: term as Term,
          applicationAmount: applicationAmount,
          asset: asset,
          condition: assetCondition === 'New' ? 'New' : 'Used',
          ageOfAsset: ageOfAsset,
          businessOwnerName: operatingName,
          businessOwnerStreet: '',
          businessOwnerCity: '',
          bankruptcy: bankruptcy,
          creditCheckConsent: creditCheckConsent,
          sin: sin,
          dob: dob,
          vendorPortalId: '',
          quoteId: quoteId,
          expectedDeliveryDate: expectedDeliveryDate,
          bankruptcyDetails: bankruptcyDetails,
        });
      }
    }

    return (
      <View
      {...props}
      topBar={topBar}
      stepperCurrentValue={currentStep}
      stepperTotalValue={totalSteps}
      setQuoteSelected={setQuoteSelected}
      setPersonalInfo={setPersonalInfo}
      setBusinessInfo={setBusinessInfo}
      setAssetInfo={setAssetInfo}
      setCreditCheckConsent={setCreditCheckConsent}
      quoteDetails={quoteDetails}
      quoteSelected={quoteSelected}
      personalInfo={personalInfo}
      businessInfo={businessInfo}
      assetInfo={assetInfo}
      creditCheckConsent={creditCheckConsent}
      />
    );
  };
  return Presenter;
};
export default withPresenter;