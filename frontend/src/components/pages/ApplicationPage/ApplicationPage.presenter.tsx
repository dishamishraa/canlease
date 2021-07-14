import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationPageProps, routes } from './ApplicationPage';
import { DefaultQuoteOption, BusinessType, AssetInfo } from '../../../modules/types';
import { useLocation, useHistory } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { TopBarProps, defaultProps } from '../../organisms/TopBar/TopBar';
import { Profile } from '../../../modules/profile/types';
import { Quote } from '../../../modules/quote/types';
import { CreateApplicationPayload, Term } from '../../../modules/application/types';

export type ApplicationPagePresenterProps = ApplicationPageProps & {
  createApplication: (payload: CreateApplicationPayload) => Promise<APIResponse<void>>;
  quoteDetails: Quote | null;
  profile: Profile | null;
};

const withPresenter = (
    View: React.FC<ApplicationPageProps>,
  ): React.FC<ApplicationPagePresenterProps> => {
    const Presenter: React.FC<ApplicationPagePresenterProps> = (props) => {
      const {
        createApplication,
        quoteDetails,
        profile,
      } = props;
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();
    const [stepperCurrentValue, setStepperCurrentValue] = useState(1);
    const [stepperTotalValue, setStepperTotalValue] = useState(6);

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = ''
        }
        return '';
    };
    window.onload = function(){
      if (stepperTotalValue === 5) {
        history.push(routes.quoteSelection)
      } else {
        history.push(routes.startApplication)
      }
    }

    const handleBackButtonClicked = () => {
      setStepperCurrentValue(stepperCurrentValue - 1);
      switch (location.pathname){
        case (routes.assetInformation):
          history.push(routes.quoteSelection)
          break;
        case (routes.businessType):
          history.push(routes.assetInformation)
          break;
        case (routes.reviewApplicationInformation):
          history.push(routes.businessType)
          break;
        case (routes.termsOfApplication):
          history.push(routes.reviewApplicationInformation)
          break;
        default:
          history.push(routes.invalid)
          break;
      }
    }

    let topBar: TopBarProps = {};
    if (location.pathname != routes.quoteSelection || stepperTotalValue < 5){
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

    const defaultQuoteSelected: DefaultQuoteOption = {
        monthlyAmount: 0,
        term: '',
        financeRate: 0,
        purchaseOptionDate: '',
    }
    const defaultAssetInfo: AssetInfo = {
        assetCondition: '',
        ageOfAsset: 0,
        expectedDeliveryDate: '',
    }
    const defaultBusinessType: BusinessType = {
        businessType: '',
        sin: '',
        dob: '',
        bankruptcy: '',
        bankruptcyDetails: '',
    }

    const [quoteSelected, setQuoteSelected] = useState<DefaultQuoteOption>(defaultQuoteSelected);
    const [assetInfo, setAssetInfo] = useState<AssetInfo>(defaultAssetInfo);
    const [businessTypeInfo, setBusinessTypeInfo] = useState<BusinessType>(defaultBusinessType);
    const [creditCheckConsent, setCreditCheckConsent] = useState<boolean>(false);
   
    const handleCreateApplication = async () => {
      if (quoteSelected && assetInfo && businessTypeInfo && creditCheckConsent && quoteDetails && profile){
        const { 
          portalId, 
          operationName: operatingName, 
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
        const {assetCondition, ageOfAsset, expectedDeliveryDate} = assetInfo
        const {businessType, sin, dob, bankruptcy, bankruptcyDetails} = businessTypeInfo
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
          bankruptcy: bankruptcy === 'Yes' ? true : false,
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
      <>
        <View
        {...props}
        topBar={topBar}
        setQuoteSelected={setQuoteSelected}
        setAssetInfo={setAssetInfo}
        setBusinessTypeInfo={setBusinessTypeInfo}
        setCreditCheckConsent={setCreditCheckConsent}
        quoteSelected={quoteSelected}
        assetInfo={assetInfo}
        businessTypeInfo={businessTypeInfo}
        handleCreateApplication={handleCreateApplication}
        stepperCurrentValue={stepperCurrentValue}
        setStepperCurrentValue={setStepperCurrentValue}
        stepperTotalValue={stepperTotalValue}
        setStepperTotalValue={setStepperTotalValue}
        />
      </>
    );

  };
  return Presenter;
};
export default withPresenter;