import React, { useContext } from 'react';
import { AuthPageProps } from './AuthPage';
import { AuthPagePresenterProps } from './AuthPage.presenter';
import { useCreateIdentityAccount, useSignIn } from '../../../modules/account'

const withInteractor = (
  Presenter: React.FC<AuthPagePresenterProps>,
): React.FC <AuthPageProps> => {
  
  const Interactor: React.FC <AuthPageProps> = (props) => {
    const [{}, createIdentityAccount] = useCreateIdentityAccount();
    const [{}, signIn] = useSignIn();
    return (
      <Presenter
        {...props}
        createIdentityAccount = { createIdentityAccount }
        signIn = { signIn }
      />
    );
  }
  return Interactor;
};
export default withInteractor;
