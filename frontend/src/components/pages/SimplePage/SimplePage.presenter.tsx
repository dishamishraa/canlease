import React, { useEffect, useState } from 'react';
import { SimplePageProps} from './SimplePage';
import { EquipmentLeaseInfo, ContactInfoVendor, ContactInfoCustomer, ContactInfo } from '../../../lib/types';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { isObject, isEmpty, isEmptyString } from '../../../lib/utils';
import useCreateQuote, { UseCreateQuoteResult } from '../../../modules/quote/useCreateQuote';
import { CreateQuotePayload, Quote } from '../../../modules/types';
import { isVariableStatement } from 'typescript';

export type SimplePagePropsPresenterProps = SimplePageProps & {
};

const withPresenter = (
    View: React.FC<SimplePageProps>,
  ): React.FC<SimplePagePropsPresenterProps> => {
    const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
      const {
      } = props;

      const defaultEquipmentLeaseInfo: EquipmentLeaseInfo = {
        name: '',
        cost: '',
        leaseType: '',
      }

      const defaultContactInfoVendor: ContactInfoVendor = {
        vendorName: '',
        businessEmail: '',
        companyName: '',
        customerName: '',
        customerEmail: '',
        customerCompanyName: '',
      }
      
      const location = useLocation<({userType: string, equipmentLeaseInfo: EquipmentLeaseInfo})>();
      const history = useHistory();
      const { state } = location;

      const { pathname } = location;
      const [userType, setUserType] = useState('');
      const [equipmentLeaseInfo, setEquipmentLeaseInfo] = useState<EquipmentLeaseInfo>({});
      const [contactInfo, setContactInfo] = useState<ContactInfo>({});
      const [{ loading, error }, createQuote] = useCreateQuote();

      useEffect(() => {
        if(state){
          const {userType = "", equipmentLeaseInfo = {}} = state;
          setUserType(userType);
          setEquipmentLeaseInfo(equipmentLeaseInfo);
        }
      }, [userType]);

      useEffect(() => {
          handleCreateQuote();
      }, [contactInfo]);

      const handleCreateQuote = async () => {
        const { name : equipmentName, cost: equipmentCost, leaseType } = equipmentLeaseInfo
        const { customerName, customerEmail, customerCompanyName } = contactInfo;
        if(userType === "vendor"){
          const { vendorName, businessEmail, companyName } = contactInfo as ContactInfoVendor;
          const { data } = await createQuote({
            "userType": userType,
            "asset": equipmentName!,
            "applicationAmount": 0,
            "leaseType": leaseType!,
            "contactName": customerName!,
            "contactEmail": customerEmail!,
            "contactBusinessName": customerCompanyName!,
            "vendorName": vendorName!,
            "vendorEmail": businessEmail!,
            "vendorBusinessName": companyName!,
            "quoteOptions": [
              {
                "monthlyAmount": 0,
                "term": "12M",
                "financeRate": 0,
                "purchaseOptionDate": (new Date()).toString()
              }
            ]
          });
          if (data) {
            const { quoteId } = data;
            history.push(`/instaQuote/${quoteId}`)
          }
        }
      }
      
      if(pathname === "/getQuote" && isEmpty(state)){
        return <Redirect 
          to={{
            pathname: "/",
          }}
        />
      }
      if(pathname === "/contactInformation" && isEmpty(state)){
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
          setContactInfo={setContactInfo}
          contactInfo={contactInfo}
          handleCreateQuote={handleCreateQuote}/>;
  };
  return Presenter;
};
export default withPresenter;
