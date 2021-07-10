import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps } from './AuthPage';
import { APIResponse } from '../../../lib/api/types';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../../lib/config';
import {
  AccountResponse, SignInPayload, SignUpPayload, UpdateNamePayload,
} from '../../../modules/account/types';
import { CreateProfilePayload, Profile } from '../../../modules/profile/types';
import { PersonalInformation, ContactInformation, BusinessInformation } from '../../../modules/types';

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
    const history = useHistory();
    const { state, pathname} = useLocation<({
      personalInfo: PersonalInformation;
      contactInfo: ContactInformation;
      businessInfo: BusinessInformation;
    })>();
    const [cookies, setCookie] = useCookies();
    const [personalInfo, setPersonalInfo] = useState<PersonalInformation>({
      firstName: '',
      lastName: '',
      userType: 'vendor',
    });
    const [contactInfo, setContactInfo] = useState<ContactInformation>({
      email: '',
      phone: '',
      unitNumber: '',
      street: '',
      city: '',
      postalCode: '',
      province: '',
    });
    const [businessInfo, setBusinessInfo] = useState<BusinessInformation>({
      companyName: '',
      operatingName: '',
      businessSector: '',
      operatingSinceDate: '',
      businessPhone: '',
    });
    const [email, setEmail] = useState<string>('');

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
          history.push('/portal');
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

    let showBackButton: boolean;
    switch (pathname.toLowerCase()) {
      case '/account/signin':
      case '/account/signup':
      case '/account/forgotpassword':
      case '/account/createpassword':
      case '/account/resetsent':
      case '/account/verifyemail':
        showBackButton = false;
        break;
      default:
        showBackButton = true;
    }

    return <View
          {...props}
          showBackButton = {showBackButton}
          email = {email}
          handleSignUp={handleSignUp}
          handleSignIn={handleSignIn}
          setPersonalInfo={setPersonalInfo}
          setContactInfo={setContactInfo}
          setBusinessInfo={setBusinessInfo}
          />;
  };
  return Presenter;
};

export default withPresenter;
