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
        const { fromTab } = locationState;
        let quoteUserType = locationState.quoteUserType;
        if(!quoteUserType && fromTab) {
          quoteUserType = fromTab === 'Customer' ? 'vendor' : 'customer';
        }

        setState(previousState => ({
          ...previousState,
          ...locationState,
          quoteUserType,
        }));
      }
    }, [locationState]);

    const pathnameNormalized = pathname.toLowerCase();
    const { fromTab, quoteUserType, equipmentLeaseInfo, contactInfo } = state;

    const setQuoteUserType = (quoteUserType: UserType) => {
      const newState = {
        quoteUserType,
      };
      setState(newState);
      switch(flowType) {
        case 'instaQuote':
          history.push('/getQuote', newState);
          break;
        case 'createQuote':
          history.push('/portal/quote/getQuote', newState);
          break;
      }
    }

    const handleCreateQuote = async (createPayload: CreateQuotePayload) => {
      const { data } = await createQuote(createPayload);
      if (data) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + Number(MAX_AGE));

        const { quoteId } = data;
        switch(flowType) {
          case 'instaQuote':
            setCookie(INSTANT_QUOTE_COOKIE, { quoteId: quoteId, expires: expiryDate }, 
              { expires: expiryDate });
            setQuote(data);
            history.push(`/instaQuote/${quoteId}`, { quote: data });
            break;
          case 'createQuote':
            history.push(`/portal/quote/${quoteId}`, { quote: data, fromTab, quoteUserType });
            break;
        }
      }
    }
    
    const setEquipmentLeaseInfo = async (equipmentLeaseInfo: EquipmentLeaseInfo) => {
      const newState = {
        ...state,
        equipmentLeaseInfo,
      };
      setState(newState);
      switch(flowType) {
        case 'instaQuote':
          history.push('/contactInformation', newState);
          break;
        case 'createQuote':
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
          break;
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

        if(flowType === 'instaQuote') {
          createPayload.sendEmail = true;
        }

        if (completeContactInfo.type === 'vendor') {
          const { vendorName, businessEmail, companyName } = completeContactInfo;
          createPayload = {
            ...createPayload,
            vendorName,
            vendorEmail: businessEmail,
            vendorBusinessName: companyName,
          };
        }

        if (profile?.userType === 'rep') {
          const { rateCardType, fee } = equipmentLeaseInfo;
          createPayload = {
            ...createPayload,
            rateCardType,
            fee, 
          }
        }


        await handleCreateQuote(createPayload);
      }
    };

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
      // case '/portal/quote/getquote':
      //   if (profile?.userType === 'vendor' && !quoteUserType) {
      //     return <Redirect to='/portal/quote/selectType' />;
      //   }
      //   break;
      // case '/portal/quote/customerinformation':
      //   if (isEmpty(equipmentLeaseInfo)) {
      //     return <Redirect to='/portal/quote/selectType' />;
      //   }
      //   break;
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
