import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps, PersonalInformation, ContactInformation, BusinessInformation } from './AuthPage';
import { AccountTokenResponse, AccountRequest, SignInPayload, CreateProfilePayload, Profile } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { AuthContext, AuthProvider } from '../../../modules/auth';
import { User } from '../../../lib/types';

export type AuthPagePresenterProps = AuthPageProps & {
  createIdentityAccount: (payload: AccountRequest) => Promise<APIResponse<AccountTokenResponse>>;
  signIn: (payload: SignInPayload) => Promise<APIResponse<AccountTokenResponse>>;
  // getProfile: (id: string | number) => Promise<APIResponse<Profile>>;
  createProfile: (payload: CreateProfilePayload) => Promise<APIResponse<Profile>>;
};

const withPresenter = (
  View: React.FC<AuthPageProps>,
): React.FC<AuthPagePresenterProps> => {
  const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
    const {
      createIdentityAccount,
      signIn,
      // getProfile,
      createProfile
    } = props;

    const history = useHistory();
    const { state } = useLocation<({personalInfo: PersonalInformation, contactInfo: ContactInformation, businessInfo: BusinessInformation})>();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [personalInfo, setPersonalInfo] = useState<PersonalInformation>({
      firstName: '',
      lastName: ''
    });
    const [contactInfo, setContactInfo] = useState<ContactInformation>({
      email: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      province: ''
    });
    const [businessInfo, setBusinessInfo] = useState<BusinessInformation>({
      companyName: '',
      operatingName: '',
      businessSector: '',
      operatingSinceDate: '',
      businessPhone: '',
    });
    const [email, setEmail] = useState<string>('');

    console.log(personalInfo)
    console.log(contactInfo)
    console.log(businessInfo)
    
    // sign up
    const handleCreateIdentityAccount = async (payload: AccountRequest) => {
      const { data } = await createIdentityAccount(payload);
      if (data) {
        setEmail(data.email);
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
      const { data: signInData, error } = await signIn(payload);
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
      // if(signInData){
        // store jwt token in cookie
        // setCookie('token', signInData.token);
        // find the salesforce profile with the identity account id
        // const { data: profileData } = await getProfile('1')
        // if(profileData){
          // if found, check the userType and push to the correct dashboard
        // }else{
          // if no related profile found, push setup page
          history.push({
            pathname: '/account/personalInformation',
            state: {
              // email: signInData.email
              email: "test@gmail.com"
            }
          })
        // }
      // } 
    };

    const handleCompleteSetup = async() => {
      console.log(state)
      const payload: CreateProfilePayload = {
        ...personalInfo,
        ...contactInfo,
        ...businessInfo,
        country: 'Canada',
        portalId: '1',
        userType: 'customer',
        title: ''
      }
      const { data } = await createProfile(payload);
      if(data){
        // update identity with first name and last name
      }
    }

    return <View
          {...props}
          handleCreateIdentityAccount={handleCreateIdentityAccount}
          handleSignIn={handleSignIn}
          setPersonalInfo={setPersonalInfo}
          setContactInfo={setContactInfo}
          setBusinessInfo={setBusinessInfo}
          handleCompleteSetup={handleCompleteSetup}
          />;
  };
  return Presenter;
};

export default withPresenter;
