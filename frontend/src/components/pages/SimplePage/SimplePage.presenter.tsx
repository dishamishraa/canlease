import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { INSTANT_QUOTE_COOKIE, MAX_AGE } from '../../../lib/config';
import { SimplePageProps } from './SimplePage';
import {
  EquipmentLeaseInfo, ContactInfo, CreateQuoteState,
} from '../../../modules/types';
import { isEmpty } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { CreateQuotePayload, Quote } from '../../../modules/quote/types';
import { UserType } from '../../../modules/profile/types';

export type SimplePagePresenterProps = SimplePageProps & {
  createQuote: (payload: CreateQuotePayload) => Promise<APIResponse<Quote>>;
};

const withPresenter = (
  View: React.FC<SimplePageProps>,
): React.FC<SimplePagePresenterProps> => {
  const Presenter: React.FC<SimplePagePresenterProps> = (props) => {
    const {
      createQuote,
      profile,
      flowType,
    } = props;

    const [, setCookie] = useCookies();

    const history = useHistory();
    const { state: locationState, pathname } = useLocation<CreateQuoteState | undefined>();
    const [state, setState] = useState<CreateQuoteState>({});
    const [quote, setQuote] = useState<Quote>();

    useEffect(() => {
      if(locationState) {
        setState({
          ...state,
          ...locationState,
        });
      }
    }, [locationState]);

    const { quoteUserType, equipmentLeaseInfo, contactInfo } = state;

    const setQuoteUserType = (quoteUserType: UserType) => {
      const newState = {
        quoteUserType,
      };
      setState(newState);
      if (flowType === 'instaQuote') {
        history.push('/getQuote', newState);
      } else {
        history.push('/portal/quote/getQuote', newState);
      }
    }

    const handleCreateQuote = async (createPayload: CreateQuotePayload) => {
      const { data } = await createQuote(createPayload);
      if (data) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + Number(MAX_AGE));

        const { quoteId } = data;
        if (flowType === 'instaQuote') {
          setCookie(INSTANT_QUOTE_COOKIE, quoteId, { expires: expiryDate });
          setQuote(data);
          history.push(`/instaQuote/${quoteId}`, { quote: data });
        } else {
          history.push(`/portal/quote/${quoteId}`, { quote: data });
        }
      }
    }
    
    const setEquipmentLeaseInfo = async (equipmentLeaseInfo: EquipmentLeaseInfo) => {
      const newState = {
        ...state,
        equipmentLeaseInfo,
      };
      setState(newState);
      if (flowType === 'instaQuote') {
        history.push('/contactInformation', newState);
      } else {
        if (quoteUserType === 'vendor') {
          history.push('/portal/quote/customerInformation', newState);
        } else {
          if(profile) {
            const { name: equipmentName, cost: equipmentCost, leaseType } = equipmentLeaseInfo;
            const createPayload: CreateQuotePayload = {
              userType: 'customer',
              asset: equipmentName,
              applicationAmount: parseInt(equipmentCost),
              leaseType,
              contactName: profile.name,
              contactEmail: profile.email,
              contactBusinessName: profile.companyName,
            };
            await handleCreateQuote(createPayload);
          }
        }
      }
    }

    const setContactInfo = async (contactInfo: ContactInfo) => {
      let completeContactInfo = contactInfo;
      if(flowType === 'instaQuote') {
        const newState = {
          ...state,
          completeContactInfo,
        };
        setState(newState);

        if(quote) {
          const { quoteId } = quote;
          history.push(`/instaQuote/${quoteId}`, { quote });
          return;
        } 
      } else {
        if (quoteUserType === 'vendor' && profile) {
          completeContactInfo = {
            ...completeContactInfo,
            type: 'vendor',
            vendorName: profile.name,
            businessEmail: profile.email,
            companyName: profile.companyName,
          }
        }
        const newState = {
          ...state,
          completeContactInfo,
        };
        setState(newState);
      }
      
      if (quoteUserType && equipmentLeaseInfo) {
        const { name: equipmentName, cost: equipmentCost, leaseType } = equipmentLeaseInfo;
        const { customerName, customerEmail, customerCompanyName } = completeContactInfo;

        let createPayload: CreateQuotePayload = {
          userType: quoteUserType,
          asset: equipmentName,
          applicationAmount: parseInt(equipmentCost),
          leaseType,
          contactName: customerName,
          contactEmail: customerEmail,
          contactBusinessName: customerCompanyName,
        };

        if (completeContactInfo.type === 'vendor') {
          const { vendorName, businessEmail, companyName } = completeContactInfo;
          createPayload = {
            ...createPayload,
            vendorName,
            vendorEmail: businessEmail,
            vendorBusinessName: companyName,
          };
        }

        await handleCreateQuote(createPayload);
      }
    };

    const pathnameNormalized = pathname.toLowerCase();
    switch (pathnameNormalized) {
      case '/getquote':
        if (!quoteUserType) {
          return <Redirect to='/' />;
        }
        break;
      case '/contactinformation':
        if (isEmpty(equipmentLeaseInfo)) {
          return <Redirect to='/' />;
        }
        break;
      case '/portal/quote/getquote':
        if (profile?.userType === 'vendor' && !quoteUserType) {
          return <Redirect to='/portal/quote' />;
        }
        break;
      case '/portal/quote/customerinformation':
        if (isEmpty(equipmentLeaseInfo)) {
          return <Redirect to='/portal/quote' />;
        }
        break;
    }

    return <View
          {...props}
          quoteUserType={quoteUserType}
          equipmentLeaseInfo={equipmentLeaseInfo}
          contactInfo={contactInfo}
          setQuoteUserType={setQuoteUserType}
          setEquipmentLeaseInfo={setEquipmentLeaseInfo}
          setContactInfo={setContactInfo}
          profile={profile}/>;
  };
  return Presenter;
};
export default withPresenter;
