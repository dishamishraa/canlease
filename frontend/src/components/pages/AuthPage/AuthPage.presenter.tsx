import React, { useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps } from './AuthPage';
import { APIResponse } from '../../../lib/api/types';
import { SESSION_COOKIE_NAME } from '../../../lib/config';
import {
  AccountResponse, SignInPayload, SignUpPayload, UpdateNamePayload,
} from '../../../modules/account/types';
import { CreateProfilePayload, Profile } from '../../../modules/profile/types';
import { PersonalInformation, ContactInformation, BusinessInformation, AuthState } from '../../../modules/types';
import { useEffect } from 'react';
import { isEmpty } from '../../../lib/utils';
import { Account } from '../../../lib/types';
import { extractJwtPayload } from '../../../lib/token';

export type AuthPagePresenterProps = AuthPageProps & {
  account: Account | null;
  setAccount: (account: Account | null) => void;
  signUp: (payload: SignUpPayload) => Promise<APIResponse<AccountResponse>>;
  signIn: (payload: SignInPayload) => Promise<APIResponse<AccountResponse>>;
  fetchProfile: () => Promise<Profile>;
  setProfile: (profile: Profile | null) => void;
  createProfile: (payload: CreateProfilePayload) => Promise<APIResponse<Profile>>;
  updateName: (payload: UpdateNamePayload) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<AuthPageProps>,
): React.FC<AuthPagePresenterProps> => {
  const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
    const {
      account,
      setAccount,
      signUp,
      signIn,
      fetchProfile,
      setProfile,
      createProfile,
      updateName,
    } = props;

    const [, setCookie] = useCookies();
    const history = useHistory();
    const { state: locationState, pathname} = useLocation<AuthState>();
    const [state, setState] = useState<AuthState>({});
    
    useEffect(() => {
      if (locationState) {
        setState(locationState);
      }
    }, [locationState]);

    const {
      action, email, personalInfo, contactInfo, businessInfo,
    } = state;

    const setEmail = (email: string) => {
      setState({
        ...state,
        email,
      });
    }

    const setPersonalInfo = (personalInfo: PersonalInformation) => {
      const newState = {
        ...state,
        personalInfo,
      }
      setState(newState);
      history.push('/account/contactInformation', newState);
    }

    const setContactInfo = (contactInfo: ContactInformation) => {
      const newState = {
        ...state,
        contactInfo,
      }
      setState(newState);
      history.push('/account/businessInformation', newState);
    }

    const handleAuthAction = async () => {
      let handled = false;
      switch(action) {
        case 'apply_finance':
          // TODO
          break;
        case 'save_quote':
          // TODO
          break;
        default:
          break;
      }
      if(!handled) {
        history.push('/portal/dashboard');
      }
    }

    const handleCreateProfile = async (businessInfo: BusinessInformation) => {
      const newState = {
        ...state,
        businessInfo,
      }
      setState(newState);

      if(account && personalInfo && contactInfo) {
        const {error: updateError } = await updateName({
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          id: account.id,
        });
        if(updateError) {
          return;
        }
        const { data, error } = await createProfile({
          ...personalInfo,
          ...contactInfo,
          ...businessInfo,
          email: account.email,
          portalId: account.uuid,
          country: 'Canada',
          title: '',
        });
        
        if(data) {
          setProfile(data);
          await handleAuthAction();
        } else if(error) {
          // TODO
        }
      }
    }

    // sign up
    const handleSignUp = async (payload: SignUpPayload) => {
      const { data, error } = await signUp(payload);
      setEmail(payload.email);

      if (data) {
        history.push('/account/verifyEmail');
      } else if (error) {
        // TODO
      }
    };

    // sign in
    const handleSignIn = async (payload: SignInPayload) => {
      const { data, error } = await signIn(payload);
      setEmail(payload.email);

      if (data) {
        setAccount(data);
        const { exp } = extractJwtPayload(data.token);
        // store jwt token in cookie
        setCookie(SESSION_COOKIE_NAME, 
          data.token, 
          { 
            path: '/',  
            secure: true, 
            sameSite: 'none',
            expires: new Date(exp * 1000),
          },
        );

        try {
          // find the salesforce profile with the identity account id
          const profile = await fetchProfile();
          setProfile(profile);
          await handleAuthAction();
        } catch {
          // if no related profile found, push setup page
          history.push('/account/personalInformation');
        }
      } else if (error) {
        if (error.message === 'User has not confirmed sign up') {
          history.push('/account/verifyEmail');
        }
        // TODO
      }
    };

    let showBackButton: boolean = true;
    switch (pathname.toLowerCase()) {
      case '/account/signin':
      case '/account/signup':
      case '/account/forgotpassword':
      case '/account/createpassword':
      case '/account/resetsent':
      case '/account/verifyemail':
        showBackButton = false;
        break;
      case '/account/contactinformation':
        if (isEmpty(personalInfo)) {
          return <Redirect to='/account/personalInformation' />;
        }
        break;
      case '/account/businessinformation':
        if (isEmpty(contactInfo)) {
          return <Redirect to='/account/contactInformation' />;
        }
        break;
      default:
        break;
    }

    return <View
          {...props}
          showBackButton = {showBackButton}
          email = {email}
          handleSignUp={handleSignUp}
          handleSignIn={handleSignIn}
          personalInfo={personalInfo}
          contactInfo={contactInfo}
          businessInfo={businessInfo}
          setPersonalInfo={setPersonalInfo}
          setContactInfo={setContactInfo}
          handleCreateProfile={handleCreateProfile}
          />;
  };
  return Presenter;
};

export default withPresenter;
