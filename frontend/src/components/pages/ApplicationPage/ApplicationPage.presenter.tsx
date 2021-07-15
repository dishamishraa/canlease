import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationPageProps, routes } from './ApplicationPage';
import { DefaultQuoteOption, BusinessType, AssetInfo, CreateQuoteState, EquipmentLeaseInfo } from '../../../modules/types';
import { useLocation, useHistory } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { TopBarProps, defaultProps } from '../../organisms/TopBar/TopBar';
import { Profile, UserType } from '../../../modules/profile/types';
import { CreateQuotePayload, LeaseType, Quote } from '../../../modules/quote/types';
import { CreateApplicationPayload, Term } from '../../../modules/application/types';
import { getQuoteCookie} from '../../../lib/utils';
import { useCookies } from 'react-cookie';
import { updateInstaQuoteCookie } from '../../../lib/utils';

export type ApplicationPagePresenterProps = ApplicationPageProps & {
  createApplication: (payload: CreateApplicationPayload) => Promise<APIResponse<void>>;
  createQuote: (payload: CreateQuotePayload) => Promise<APIResponse<Quote>>;
  quoteDetails: Quote | null;
  profile: Profile | null;
};

const withPresenter = (
    View: React.FC<ApplicationPageProps>,
  ): React.FC<ApplicationPagePresenterProps> => {
    const Presenter: React.FC<ApplicationPagePresenterProps> = (props) => {
      const {
        createApplication,
        createQuote,
        quoteDetails,
        profile,
      } = props;
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();
    const [stepperCurrentValue, setStepperCurrentValue] = useState(1);
    const [stepperTotalValue, setStepperTotalValue] = useState(6);
    const [createQuoteState, setCreateQuoteState] = useState<CreateQuoteState>({});
    const [quote, setQuote] = useState<Quote>();
    const [, setCookie, removeCookie] = useCookies();

    const quoteCookieObj = getQuoteCookie();
    useEffect(() => {
      if(quoteCookieObj?.action === 'apply_finance'){
        setStepperCurrentValue(1);
        setStepperTotalValue(5);
        updateInstaQuoteCookie({}, setCookie, removeCookie);
      }
    }, [quoteCookieObj]) 

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
        history.push('/portal/application/quoteSelection');
      } else {
        history.push('/portal/application/userSelection');
      }
    }
    const setQuoteUserType = (userType: UserType) => {
      const newState = {
        ...createQuoteState,
        userType,
      }
      setCreateQuoteState(newState);
      history.push('/portal/application/startApplication');
    }
    
    const handleBackButtonClicked = () => {
      setStepperCurrentValue(stepperCurrentValue - 1);
      switch (location.pathname){
        case (routes.startApplication):
          history.push(routes.userSelection);
        case (routes.quoteSelection):
          history.push(routes.startApplication);
        case (routes.assetInformation):
          history.push(routes.quoteSelection);
          break;
        case (routes.businessType):
          history.push(routes.assetInformation);
          break;
        case (routes.reviewApplicationInformation):
          history.push(routes.businessType);
          break;
        case (routes.termsOfApplication):
          history.push(routes.reviewApplicationInformation);
          break;
        default:
          history.push(routes.invalid);
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
    const defaultLeasyType: LeaseType = 'stretch';
    const defaultEquipInfo: EquipmentLeaseInfo = {
      name: '',
      cost: '',
      leaseType: defaultLeasyType
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

    const [equipInfo, setEquipInfo] = useState<EquipmentLeaseInfo>(defaultEquipInfo);
    const [quoteSelected, setQuoteSelected] = useState<DefaultQuoteOption>(defaultQuoteSelected);
    const [assetInfo, setAssetInfo] = useState<AssetInfo>(defaultAssetInfo);
    const [businessTypeInfo, setBusinessTypeInfo] = useState<BusinessType>(defaultBusinessType);
    const [creditCheckConsent, setCreditCheckConsent] = useState<boolean>(false);

    const handleCreateQuote = async () => {
      const { quoteUserType, equipmentLeaseInfo, contactInfo} = createQuoteState;
      if(quoteUserType && equipmentLeaseInfo && profile){
        const { name: asset, cost, leaseType } = equipmentLeaseInfo;
        const { name: applicantName, email, companyName } = profile;
        let payload: CreateQuotePayload = {
          userType: quoteUserType,
          asset: asset,
          applicationAmount: +cost,
          leaseType: leaseType,
          contactName: applicantName,
          contactEmail: email,
          contactBusinessName: companyName
        }
        if(quoteUserType === 'vendor' && contactInfo){
          const { customerName, customerEmail, customerCompanyName} = contactInfo;
          payload = {
            ...payload,
            contactName: customerName,
            contactEmail: customerEmail,
            contactBusinessName: customerCompanyName,
            vendorName: applicantName,
            vendorEmail: email,
            vendorBusinessName: companyName
          }
        }
        const { data } = await createQuote(payload);
        if(data){
          const { quoteId } = data;
          setQuote(data);
          history.push(`/portal/quote/${quoteId}`, { quote: data });
        }
      }
    }
   
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
        setEquipInfo={setEquipInfo}
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
        setQuoteUserType={setQuoteUserType}
        handleCreateQuote={handleCreateQuote}
        />
      </>
    );

  };
  return Presenter;
};
export default withPresenter;