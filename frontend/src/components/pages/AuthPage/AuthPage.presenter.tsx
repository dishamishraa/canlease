import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps } from './AuthPage';
import { AccountTokenResponse, AccountRequest, SignInPayload } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { AuthContext, AuthProvider } from '../../../modules/auth';

export type AuthPagePresenterProps = AuthPageProps & {
  createIdentityAccount: (payload: AccountRequest) => Promise<APIResponse<AccountTokenResponse>>;
  signIn: (payload: SignInPayload) => Promise<APIResponse<AccountTokenResponse>>;
};

const withPresenter = (
  View: React.FC<AuthPageProps>,
): React.FC<AuthPagePresenterProps> => {
  const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
    const {
      createIdentityAccount,
      signIn,
    } = props;

    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies();

    // sign up
    const handleCreateIdentityAccount = async (payload: AccountRequest) => {
      const { data } = await createIdentityAccount(payload);
      if (data) {
        history.push({
          pathname: '/account/verifyEmail',
          state: {
            email: data.email,
            contentType: 'VerifyEmail',
          },
        });
      }
    };

    // sign in
    const handleSignIn = async (payload: SignInPayload) => {
      console.log('sign in')
      const { data, error } = await signIn(payload);
      if(error){
        if(error.message === 'User has not confirmed sign up'){
          history.push({
            pathname: '/account/verifyEmail',
            state: {
              email: payload.email,
              contentType: 'VerifyEmail',
            },
          });
        }
      }
      if(data){
      // find the salesforce profile with the identity account id
      // check the userType and push to the correct dashboard

      // if no related profile found, push setup page
      } 
    };

    // setup account

    return <View
          {...props}
          handleCreateIdentityAccount={handleCreateIdentityAccount}
          handleSignIn={handleSignIn}
          />;
  };
  return Presenter;
};

export default withPresenter;
