import React, { useContext } from 'react';
import { AuthPageProps } from './AuthPage';
import { AuthPagePresenterProps } from './AuthPage.presenter';
import { useCreateIdentityAccount, useSignIn, useUpdateName } from '../../../modules/account';
import { useGetProfile, useCreateProfile } from '../../../modules/profile';
import { AuthContext, AuthContextValue } from '../../../modules/auth';
import { useParams } from 'react-router';

const withInteractor = (
  Presenter: React.FC<AuthPagePresenterProps>,
): React.FC <AuthPageProps> => {
  const Interactor: React.FC <AuthPageProps> = (props) => {
    const [{loading: createAccountLoading, error: createAccountError}, createIdentityAccount] = useCreateIdentityAccount();
    const [{loading: signInLoading, error: signInError}, signIn] = useSignIn();
    const [{loading: createProfileLoading, error: createProfileError}, createProfile] = useCreateProfile();
    const [{loading: updateLoading}, updateName] = useUpdateName();
    return (
      <Presenter
        {...props}
        createIdentityAccount = { createIdentityAccount }
        signIn = { signIn }
        createProfile = { createProfile }
        updateName = { updateName }
      />
    );
  };
  return Interactor;
};
export default withInteractor;
