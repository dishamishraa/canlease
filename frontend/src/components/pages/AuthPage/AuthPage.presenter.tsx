import React, { useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps } from './AuthPage';
import { APIResponse } from '../../../lib/api/types';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../../lib/config';
import {
  AccountResponse, SignInPayload, SignUpPayload, UpdateNamePayload,
} from '../../../modules/account/types';
import { CreateProfilePayload, Profile } from '../../../modules/profile/types';
import { PersonalInformation, ContactInformation, BusinessInformation, AuthState } from '../../../modules/types';
import { useEffect } from 'react';
import { isEmpty } from '../../../lib/utils';

export type AuthPagePresenterProps = AuthPageProps & {
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

    const setBusinessInfo = (businessInfo: BusinessInformation) => {
      const newState = {
        ...state,
        businessInfo,
      }
      setState(newState);
      history.push('', newState);
    }

    // sign up
    const handleSignUp = async (payload: SignUpPayload) => {
      const { data: account, error } = await signUp(payload);
      setEmail(payload.email);

      if (account) {
        const { data: profileData, error: profileError } = await createProfile({
          email: account.email,
          portalId: account.uuid,
          country: 'Canada',
        });

        if (profileData) {
          history.push('/account/verifyEmail');
        } else if (profileError) {
          // TODO
        }
      } else if (error) {
        // TODO
      }
    };

    // sign in
    const handleSignIn = async (payload: SignInPayload) => {
      const { data: account, error } = await signIn(payload);
      setEmail(payload.email);

      if (account) {
        // store jwt token in cookie
        setCookie(SESSION_COOKIE_NAME, account.token, { path: '/',  secure: true, sameSite: 'none' });

        try {
          // find the salesforce profile with the identity account id
          const profile = await fetchProfile();
          setProfile(profile);
          history.push('/portal/dashboard');
        } catch {
          // if no related profile found, push setup page
          history.push('/account/personalInformation');
        }
      } else if (error) {
        if (error.message === 'User has not confirmed sign up') {
          history.push('/account/verifyEmail');
        }
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
          setBusinessInfo={setBusinessInfo}
          />;
  };
  return Presenter;
};

export default withPresenter;
