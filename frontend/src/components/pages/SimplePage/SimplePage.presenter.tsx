import React, { useEffect, useState } from 'react';
import { SimplePageProps} from './SimplePage';
import { EquipmentLeaseInfo, ContactInfoVendor, ContactInfoCustomer, ContactInfo } from '../../../modules/types';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { isObject, isEmpty, isEmptyString } from '../../../lib/utils';
import useCreateQuote, { UseCreateQuoteResult } from '../../../modules/quote/useCreateQuote';
import { CreateQuotePayload, Quote } from '../../../modules/types';
import { isVariableStatement } from 'typescript';
import { Cookies, useCookies } from 'react-cookie';
import { INSTANT_QUOTE_COOKIE, MAX_AGE } from '../../../lib/config';
import { APIResponse } from '../../../lib/api/types';

export type SimplePagePropsPresenterProps = SimplePageProps & {
  createQuote: (payload: CreateQuotePayload) => Promise<APIResponse<Quote>>;
};

const withPresenter = (
    View: React.FC<SimplePageProps>,
  ): React.FC<SimplePagePropsPresenterProps> => {
    const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
      const {
        createQuote
      } = props;

      const [cookies, setCookie, removeCookie] = useCookies();
      
      const location = useLocation<({userType: string, equipmentLeaseInfo: EquipmentLeaseInfo})>();
      const history = useHistory();
      const { state } = location;

      const defaultEquipmentLeaseInfo = {
          name: "",
          cost: "",
          leaseType: "",
      }
      
      const { pathname } = location;
      const [userType, setUserType] = useState('');
      const [equipmentLeaseInfo, setEquipmentLeaseInfo] = useState<EquipmentLeaseInfo>(defaultEquipmentLeaseInfo);

      useEffect(() => {
        if(state){
          const {userType = "", equipmentLeaseInfo} = state;
          setUserType(userType);
          setEquipmentLeaseInfo(equipmentLeaseInfo);
        }
      }, [userType]);

      const handleCreateQuote = async (contactInfo: ContactInfo) => {
        if(equipmentLeaseInfo) {
          const { name : equipmentName, cost: equipmentCost, leaseType } = equipmentLeaseInfo
          const { customerName, customerEmail, customerCompanyName } = contactInfo;
          if(userType === "vendor"){
            const { vendorName, businessEmail, companyName } = contactInfo as ContactInfoVendor;
            const { data } = await createQuote({
              userType: userType,
              asset: equipmentName!,
              applicationAmount: parseInt(equipmentCost!),
              leaseType: leaseType!,
              contactName: customerName!,
              contactEmail: customerEmail!,
              contactBusinessName: customerCompanyName!,
              vendorName: vendorName!,
              vendorEmail: businessEmail!,
              vendorBusinessName: companyName!,
              quoteOptions: []
            });
            if (data) {
              const expiryDate = new Date();
              expiryDate.setTime(expiryDate.getTime() + Number(MAX_AGE)); 
              setCookie(INSTANT_QUOTE_COOKIE, {userType: userType, equipmentLeaseInfo: equipmentLeaseInfo, contactInfo: contactInfo}, {expires: expiryDate});

              const { quoteId } = data;
              history.push(`/instaQuote/${quoteId}`)
            }
          }
        }
      }
      
      if(pathname.toLowerCase() === "/getquote" && isEmpty(state)){
        return <Redirect 
          to={{
            pathname: "/",
          }}
        />
      }
      if(pathname.toLowerCase() === "/contactinformation" && isEmpty(state)){
        return <Redirect 
          to={{
            pathname: "/",
          }}
        />
      }

      return <View
          {...props}
          setUserType={setUserType}
          setEquipmentLeaseInfo={setEquipmentLeaseInfo}
          equipmentLeaseInfo={equipmentLeaseInfo}
          userType={userType}
          handleCreateQuote={handleCreateQuote}/>;
  };
  return Presenter;
};
export default withPresenter;
