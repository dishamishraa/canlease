import React, { useEffect, useState } from 'react';
import { AuthPageProps } from './AuthPage'
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Account, AccountTokenResponse, IdentityAccountPayload, SignInPayload } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { AuthContext, AuthProvider } from '../../../modules/auth';

export type AuthPagePresenterProps = AuthPageProps & {
  createIdentityAccount:(payload: IdentityAccountPayload) => Promise<APIResponse<Account>>;
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
      const { state } = useLocation();

      //sign up
      const handleCreateIdentityAccount = async(payload: IdentityAccountPayload) => {
        const { data } = await createIdentityAccount(payload);
        if(data){

          history.push(`/account/verifyEmail/${data.id}`);
        }
      }

      //sign in
      const handleSignIn = async(payload: SignInPayload) => {
        const { data } = await signIn(payload);
        if(data){
          //if already verified, go to vendor/user dashboard
          if(data.enabled){
            //find the salesforce profile with the identity account id

            //check the userType and push to the correct dashboard

          }else{
          //if not verified, go to setup

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