import React, { useState } from 'react';
import { SimplePageProps } from './SimplePage';
import { Cookies, useCookies } from 'react-cookie';
import { INSTANT_QUOTE_COOKIE, MAX_AGE } from '../../../lib/config';

export type SimplePagePropsPresenterProps = SimplePageProps & {
};

const withPresenter = (
  View: React.FC<SimplePageProps>,
): React.FC<SimplePagePropsPresenterProps> => {
  const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
    const {
      
    } = props;
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userType, setUserType] = useState('');
  
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + Number(MAX_AGE)); 
    
    //set cookie after quote api call complete
    //add other quote details to cookie
    setCookie(INSTANT_QUOTE_COOKIE, {userType: userType}, {expires: expiryDate});
   
    return <View
            {...props}
            setUserType={setUserType}
            userType={userType}
            {...props} />;
  };
  return Presenter;
};
export default withPresenter;
