import React, { useState, useEffect } from 'react';
import { ApplicationPageProps } from './ApplicationPage';
import { AssetInfo, CreateApplicationState, ApplicationPersonalInfo, ApplicationBusinessInfo, ApplicationBusinessInfoVendor} from '../../../modules/types';
import { useLocation, useHistory } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { Profile } from '../../../modules/profile/types';
import { Quote, QuoteOption } from '../../../modules/quote/types';
import { CreateApplicationPayload, Term } from '../../../modules/application/types';

export type ApplicationPagePresenterProps = ApplicationPageProps & {
  createApplication: (payload: CreateApplicationPayload) => Promise<APIResponse<void>>;
  profile: Profile | null;
};

const customerStepsMap: Record<string, number> = {
  '/portal/application/personalinfo': 2,
  '/portal/application/businessinfo': 3,
  '/portal/application/assetinfo': 4,
  '/portal/application/reviewapplicationinfo': 5,
  '/portal/application/termsofapplication': 6,
};

const vendorStepsMap: Record<string, number> = {
  '/portal/application/businessinfo': 2,
  '/portal/application/assetinfo': 3,
  '/portal/application/reviewapplicationinfo': 4,
  '/portal/application/termsofapplication': 5,
};

const withPresenter = (
    View: React.FC<ApplicationPageProps>,
  ): React.FC<ApplicationPagePresenterProps> => {
    const Presenter: React.FC<ApplicationPagePresenterProps> = (props) => {
    const {
      createApplication,
      profile,
    } = props;

    const history = useHistory();
    const { state: locationState, pathname } = useLocation<CreateApplicationState | undefined>();
    const { fromTab } = locationState || {};
    const useCustomerFlow = fromTab === 'Customer';
    const stepsMap = useCustomerFlow ? customerStepsMap : vendorStepsMap;
    const [state, setState] = useState<CreateApplicationState>({
      currentStep: 1,
      totalSteps: Object.keys(stepsMap).length + 1, // stepsMap doesn't include the first step
    });

    useEffect(() => {
      if(locationState) {
        setState(previousState => ({
          ...previousState,
          ...locationState,
        }));
      }
    }, [locationState]);

    useEffect(() => {
      const pathnameNormalized = pathname.toLowerCase();
      const step = stepsMap[pathnameNormalized] || 1;
      setState(previousState => ({
        ...previousState,
        currentStep: step,
      }))
    }, [pathname, stepsMap]);

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

    const handleEditClicked = (page: string) => {
      switch (page) {
        case "assetInfo":
          history.push('/portal/application/assetInfo', state)
          break;
        case "businessInfo":
          history.push('/portal/application/businessInfo', state)
          break;
        case "paymentDetails":
          history.push(`/portal/application/applyQuote/${quoteDetails?.quoteId}`, state)
          break;
        case "quoteDetails":
          break;
        case "customerBusinessInfo":
          history.push('/portal/application/businessInfo', state)
          break;
        case "customerPersonalInfo":
          history.push('/portal/application/personalInfo', state)
          break;
        default:
          break;
      }
    }

    const setQuoteSelected = (quoteDetails: Quote, quoteSelected: QuoteOption) => {
      const newState = {
        ...state,
        fromTab,
        currentStep,
        totalSteps,
        quoteDetails,
        quoteSelected,
      }
      setState(newState);
      
      if(fromTab === 'Customer') {
        history.push('/portal/application/personalInfo', newState);
      } else {
        history.push('/portal/application/businessInfo', newState);
      }
    }

    const setPersonalInfo = (personalInfo: ApplicationPersonalInfo) => {
      const newState = {
        ...state,
        personalInfo,
      }
      setState(newState);
      history.push('/portal/application/businessInfo', newState);
    }

    const setBusinessInfo = (businessInfo: ApplicationBusinessInfo) => {
      const newState = {
        ...state,
        businessInfo,
      }
      setState(newState);
      history.push('/portal/application/assetInfo', newState);
    }

    const setAssetInfo = (assetInfo: AssetInfo) => {
      const newState = {
        ...state,
        assetInfo,
      }
      setState(newState);
      history.push('/portal/application/reviewApplicationInfo', newState);
    }

    const setCreditCheckConsent = async (creditCheckConsent: boolean) => {
      const newState = {
        ...state,
        creditCheckConsent,
      }
      setState(newState);
      await handleCreateApplication(creditCheckConsent);
      history.push('/portal/application/submitted', newState);
    }

    const handleCreateApplication = async (creditCheckConsent: boolean) => {
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
        const { term } = quoteSelected;
        const { assetCondition, ageOfAsset, expectedDeliveryDate } = assetInfo;
        const { businessType, sin, dob, bankruptcy, bankruptcyDetails } = businessInfo;
        const { applicationAmount, asset, quoteId } = quoteDetails;
       
        const checkYearsInBusiness = (operatingSinceDate: string) => {
          const date = new Date(operatingSinceDate); 
          const diffTime = Date.now() - date.getTime();
          const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365); 
          return diffYears;
        }
        let applicationPayload: CreateApplicationPayload = {
          lesseePortalId: portalId,
          operatingName: operatingName,
          businessName: companyName,
          businessType: businessType,
          yearsInBusiness: checkYearsInBusiness(operatingSinceDate),
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
          condition: assetCondition,
          ageOfAsset: ageOfAsset,
          businessOwnerName: operatingName,
          businessOwnerStreet: '',
          businessOwnerCity: '',
          bankruptcy: bankruptcy,
          creditCheckConsent: creditCheckConsent,
          sin: sin,
          dob: dob,
          vendorPortalId: undefined,
          quoteId: quoteId,
          expectedDeliveryDate: expectedDeliveryDate,
          bankruptcyDetails: bankruptcyDetails,
        }
        if (useCustomerFlow && personalInfo) {
          const { bankruptcy, bankruptcyDetails, businessType, companyName, dob,
            operatingName, operatingSinceDate, sin, website } = businessInfo as ApplicationBusinessInfoVendor
          const { address, city, email, firstName, phone, postalCode, province} = personalInfo
          applicationPayload = {
            ...applicationPayload,
            operatingName: operatingName,
            businessName: companyName,
            businessType: businessType,
            yearsInBusiness: checkYearsInBusiness(operatingSinceDate),
            contactName: firstName,
            contactEmail: email,
            contactPhone: phone,
            contactWebsite: website,
            street: address,
            city: city,
            province: province,
            postalCode: postalCode,
            businessOwnerName: operatingName,
            bankruptcy: bankruptcy,
            sin: sin,
            dob: dob,
            bankruptcyDetails: bankruptcyDetails,
          }
        }
        await createApplication(applicationPayload);
      }
    }

    return (
      <View
        {...props}
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
        handleEditClicked={handleEditClicked}
        fromTab={fromTab}
        />
    );
  };
  return Presenter;
};
export default withPresenter;