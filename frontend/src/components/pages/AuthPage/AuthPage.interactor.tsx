import React, { useContext } from 'react';
import { useSignIn, useSignUp, useUpdateName } from '../../../modules/account';
import { AuthContext } from '../../../modules/auth';
import { useCreateProfile, useAddQuoteToProfile } from '../../../modules/profile';
import { getProfile } from '../../../modules/profile/api';
import { AuthPageProps } from './AuthPage';
import { AuthPagePresenterProps } from './AuthPage.presenter';

const withInteractor = (
  Presenter: React.FC<AuthPagePresenterProps>,
): React.FC <AuthPageProps> => {
  const Interactor: React.FC <AuthPageProps> = (props) => {
    const { account, setAccount, setProfile, } = useContext(AuthContext);
    const [signUpState, signUp] = useSignUp();
    const [signInState, signIn] = useSignIn();
    const [createProfileState, createProfile] = useCreateProfile();
    const [updateNameState, updateName] = useUpdateName();
    const portalId = account?.uuid || '';
    const [, addQuoteToProfile] = useAddQuoteToProfile(portalId);
    
    return (
      <Presenter
        {...props}
        account={account}
        setAccount={setAccount}
        signUp={signUp}
        signIn={signIn}
        fetchProfile={getProfile}
        setProfile={setProfile}
        createProfile={createProfile}
        updateName={updateName}
        addQuoteToProfile={addQuoteToProfile}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
