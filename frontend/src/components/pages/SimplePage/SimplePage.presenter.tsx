import React, { useEffect, useState } from 'react';
import { SimplePageProps} from './SimplePage';
import { EquipmentLeaseInfo, ContactInfoVendor, ContactInfoCustomer, ContactInfo } from '../../../lib/types';
import { Redirect, useLocation } from 'react-router-dom';
import { isObject, isEmpty, isEmptyString } from '../../../lib/utils';


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
        leastType: '',
      }

      const defaultContactInfoVendor: ContactInfoVendor = {
        vendorName: '',
        businessEmail: '',
        companyName: '',
        customerName: '',
        customerEmail: '',
        customerCompanyName: '',
      }
      
      const location = useLocation<({userType: string})>();
      const { state } = location;

      const { pathname } = location;
      const [userType, setUserType] = useState('');
      const [equipmentLeaseInfo, setEquipmentLeaseInfo] = useState<EquipmentLeaseInfo>({});
      const [contactInfo, setContactInfo] = useState<ContactInfo>({});

      // useEffect(() => {
      //   if(state){
      //     const { userType: prevUserType } = state;
      //     setUserType(prevUserType);
      //   }
      // }, [state]);

      if(pathname === "/getQuote" && isEmptyString(userType)){
        console.log(!isEmpty(state) && isEmptyString(userType))
        return <Redirect 
          to={{
            pathname: "/",
          }}
        />
      }
      if(pathname === "/contactInformation" && isEmpty(equipmentLeaseInfo) && isEmptyString(userType)){
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
          contactInfo={contactInfo}/>;
  };
  return Presenter;
};
export default withPresenter;
