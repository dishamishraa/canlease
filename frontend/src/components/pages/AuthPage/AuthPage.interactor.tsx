import React, { useContext } from 'react';
import { AuthPageProps } from './AuthPage';
import { AuthPagePresenterProps } from './AuthPage.presenter';
import { useCreateIdentityAccount, useSignIn } from '../../../modules/account';
import { useGetProfile, useCreateProfile } from '../../../modules/profile';
import { AuthContext, AuthContextValue } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<AuthPagePresenterProps>,
): React.FC <AuthPageProps> => {
  const Interactor: React.FC <AuthPageProps> = (props) => {
    const [{loading: createAccountLoading, error: createAccountError}, createIdentityAccount] = useCreateIdentityAccount();
    const [{loading: signInLoading, error: signInError}, signIn] = useSignIn();
    // const [{loading: getProfileLoading, error: getProfileError}, getProfile] = useGetProfile('1');
    const [{loading: createProfileLoading, error: createProfileError}, createProfile] = useCreateProfile();
    const { user, account }: AuthContextValue = useContext(AuthContext);
    return (
      <Presenter
        {...props}
        createIdentityAccount = { createIdentityAccount }
        signIn = { signIn }
        // getProfile = { getProfile }
        createProfile = { createProfile }
      />
    );
  };
  return Interactor;
};
export default withInteractor;
