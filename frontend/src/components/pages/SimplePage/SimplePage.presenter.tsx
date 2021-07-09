import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { INSTANT_QUOTE_COOKIE, MAX_AGE } from '../../../lib/config';
import { SimplePageProps } from './SimplePage';
import {
  EquipmentLeaseInfo, ContactInfo,
} from '../../../modules/types';
import { isEmpty } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { CreateQuotePayload, Quote } from '../../../modules/quote/types';

export type SimplePagePropsPresenterProps = SimplePageProps & {
  createQuote: (payload: CreateQuotePayload) => Promise<APIResponse<Quote>>;
};

const withPresenter = (
  View: React.FC<SimplePageProps>,
): React.FC<SimplePagePropsPresenterProps> => {
  const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
    const {
      createQuote,
    } = props;

    const [cookies, setCookie] = useCookies();

    const { state, pathname } = useLocation<({
      userType: string;
      equipmentLeaseInfo: EquipmentLeaseInfo;
    })>();

    const history = useHistory();
    const defaultEquipmentLeaseInfo = {
      name: '',
      cost: '',
      leaseType: '',
    };
    const [userType, setUserType] = useState('');
    const [
      equipmentLeaseInfo,
      setEquipmentLeaseInfo,
    ] = useState<EquipmentLeaseInfo>(defaultEquipmentLeaseInfo);

    useEffect(() => {
      if (state) {
        setUserType(state.userType);
        setEquipmentLeaseInfo(state.equipmentLeaseInfo);
      }
    }, [state, userType]);

    const handleCreateQuote = async (contactInfo: ContactInfo) => {
      if (equipmentLeaseInfo) {
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
        } as CreateQuotePayload;

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

          setCookie(INSTANT_QUOTE_COOKIE,
            {
              userType, equipmentLeaseInfo, contactInfo,
            },
            {
              expires: expiryDate,
            });

          const { quoteId } = data;
          history.push(`/instaQuote/${quoteId}`, {userType})
        }
      }
    };

    if (pathname.toLowerCase() === '/getquote' && isEmpty(state)) {
      return <Redirect
          to={{
            pathname: '/',
          }}
        />;
    }
    if (pathname.toLowerCase() === '/contactinformation' && isEmpty(state)) {
      return <Redirect
          to={{
            pathname: '/',
          }}
        />;
    }

    return <View
          {...props}
          showBackButton={pathname !== '/'}
          setUserType={setUserType}
          setEquipmentLeaseInfo={setEquipmentLeaseInfo}
          equipmentLeaseInfo={equipmentLeaseInfo}
          userType={userType}
          handleCreateQuote={handleCreateQuote}/>;
  };
  return Presenter;
};
export default withPresenter;
