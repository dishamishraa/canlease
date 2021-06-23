import React, { useEffect, useState } from 'react';
import { AuthPageProps } from './AuthPage'
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { AccountTokenResponse, AccountRequest, SignInPayload } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { AuthContext, AuthProvider } from '../../../modules/auth';
import { useCookies } from 'react-cookie';

export type AuthPagePresenterProps = AuthPageProps & {
  createIdentityAccount:(payload: AccountRequest) => Promise<APIResponse<AccountTokenResponse>>;
  signIn:(payload: SignInPayload) => Promise<APIResponse<AccountTokenResponse>>;
};

const withPresenter = (
    View: React.FC<AuthPageProps>,
  ): React.FC<AuthPagePresenterProps> => {
    const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
      const { 
        createIdentityAccount,
        signIn
      } = props

      const history = useHistory();
      const [cookies, setCookie, removeCookie] = useCookies();

      //sign up
      const handleCreateIdentityAccount = async(payload: AccountRequest) => {
        const { data } = await createIdentityAccount(payload);
        if(data){
          history.push({
            pathname: '/account/verifyEmail', 
            state: {
              email: data.email,
              contentType: 'VerifyEmail'
            }
          });
        }
      }

      //sign in
      const handleSignIn = async(payload: SignInPayload) => {
        const { data } = await signIn(payload);
        if(data){
          //if already verified, go to vendor/user dashboard
          setCookie('token', data.token)
          if(data.enabled){
            //find the salesforce profile with the identity account id

            //check the userType and push to the correct dashboard
            
          }else{
            //if not verified, send a verification email and take to verify email page
            history.push({
              pathname: '/account/verifyEmail', 
              state: {
                email: data.email,
                contentType: 'VerifyEmail'
              }
            });
          }
        }
      }

      //reset password


      //setup account


        return <View
          {...props}
          handleCreateIdentityAccount={handleCreateIdentityAccount}
          />;
    };
  return Presenter;
};

export default withPresenter