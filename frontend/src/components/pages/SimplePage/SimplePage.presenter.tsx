import React, { useState } from 'react';
import { SimplePageProps } from './SimplePage';
import { Cookies, useCookies } from 'react-cookie';

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
  
    const instantQuoteCookie = "instantQuote";
    const MAX_AGE=6*30.5*24*3600;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + MAX_AGE); 
    
    //set cookie after quote api call complete
    //add other quote details to cookie
    setCookie(instantQuoteCookie, {userType: userType}, {expires: expiryDate});
   
    return <View
            {...props}
            setUserType={setUserType}
            userType={userType}
            instantQuoteCookie={instantQuoteCookie}
            {...props} />;
  };
  return Presenter;
};
export default withPresenter;
