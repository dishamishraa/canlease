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

    const { userType, equipmentLeaseInfo, contactInfo } = state;

    const setUserType = (userType: UserType) => {
      const newState = {
        userType,
      };
      setState(newState);
      history.push('/getQuote', newState);
    }

    const setEquipmentLeaseInfo = (equipmentLeaseInfo: EquipmentLeaseInfo) => {
      const newState = {
        ...state,
        equipmentLeaseInfo,
      };
      setState(newState);
      history.push('/contactInformation', newState);
    }

    const handleCreateQuote = async (contactInfo: ContactInfo) => {
      const newState = {
        ...state,
        contactInfo,
      };
      setState(newState);

      if(quote) {
        const { quoteId } = quote;
        history.push(`/instaQuote/${quoteId}`, { userType, quote });
      } else if (userType && equipmentLeaseInfo) {
        const { name: equipmentName, cost: equipmentCost, leaseType } = equipmentLeaseInfo;
        const { customerName, customerEmail, customerCompanyName } = contactInfo;

        let createPayload: CreateQuotePayload = {
          userType,
          asset: equipmentName,
          applicationAmount: parseInt(equipmentCost),
          leaseType,
          contactName: customerName,
          contactEmail: customerEmail,
          contactBusinessName: customerCompanyName,
        };

        if (contactInfo.type === 'vendor') {
          const { vendorName, businessEmail, companyName } = contactInfo;
          createPayload = {
            ...createPayload,
            vendorName,
            vendorEmail: businessEmail,
            vendorBusinessName: companyName,
          };
        }

        const { data } = await createQuote(createPayload);
        if (data) {
          const expiryDate = new Date();
          expiryDate.setTime(expiryDate.getTime() + Number(MAX_AGE));

          const { quoteId } = data;
          setCookie(INSTANT_QUOTE_COOKIE, quoteId, { expires: expiryDate });
          setQuote(data);
          history.push(`/instaQuote/${quoteId}`, { userType, quote: data });
        }
      }
    };

    const pathnameNormalized = pathname.toLowerCase();
    switch (pathnameNormalized) {
      case '/getquote':
        if (!userType) {
          return <Redirect to='/' />;
        }
        break;
      case '/contactinformation':
        if (isEmpty(equipmentLeaseInfo)) {
          return <Redirect to='/' />;
        }
        break;
    }

    return <View
          {...props}
          showBackButton={pathnameNormalized !== '/'}
          userType={userType}
          equipmentLeaseInfo={equipmentLeaseInfo}
          contactInfo={contactInfo}
          setUserType={setUserType}
          setEquipmentLeaseInfo={setEquipmentLeaseInfo}
          handleCreateQuote={handleCreateQuote}/>;
  };
  return Presenter;
};
export default withPresenter;
