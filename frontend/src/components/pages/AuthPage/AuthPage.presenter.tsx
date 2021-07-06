import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthPageProps, PersonalInformation, ContactInformation, BusinessInformation, routes } from './AuthPage';
import { AccountTokenResponse, AccountRequest, SignInPayload, CreateProfilePayload, Profile, UpdateNamePayload } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { getProfile } from '../../../modules/profile/api';
import { AUTH_COOKIE, MAX_AGE } from '../../../lib/config';
import { routes as appRoutes } from '../../../App';

export type AuthPagePresenterProps = AuthPageProps & {
  createIdentityAccount: (payload: AccountRequest) => Promise<APIResponse<AccountTokenResponse>>;
  signIn: (payload: SignInPayload) => Promise<APIResponse<AccountTokenResponse>>;
  createProfile: (payload: CreateProfilePayload) => Promise<APIResponse<Profile>>;
  updateName: (payload: UpdateNamePayload) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<AuthPageProps>,
): React.FC<AuthPagePresenterProps> => {
  const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
    const {
      createIdentityAccount,
      signIn,
      createProfile,
      updateName,
    } = props;

    const history = useHistory();
    const { state } = useLocation<({personalInfo: PersonalInformation, contactInfo: ContactInformation, businessInfo: BusinessInformation})>();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [personalInfo, setPersonalInfo] = useState<PersonalInformation>({
      firstName: '',
      lastName: '',
      userType: 'vendor'
    });
    const [contactInfo, setContactInfo] = useState<ContactInformation>({
      email: '',
      phone: '',
      unitNumber: '',
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
    const [id, setId] = useState(localStorage.getItem('id'));
    
    // sign up
    const handleCreateIdentityAccount = async (payload: AccountRequest) => {
      const { data } = await createIdentityAccount(payload);
      if (data) {
        history.push({
          pathname: routes.verifyEmail,
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
            pathname: routes.verifyEmail,
            state: {
              email: payload.email,
              contentType: 'VerifyEmail',
            },
          });
        }
      }
      if(signInData){
        // store jwt token in cookie
        setCookie(AUTH_COOKIE, signInData.token);
        setId(signInData.id);
        // find the salesforce profile with the identity account id
        const data = await getProfile(signInData.id);
        if(data){
          // push to dashboard
          const { userType } = data;
          history.push({ pathname: appRoutes.portal, state: {
            userType: userType
          }});
        }else{
          // if no related profile found, push setup page
          history.push({
            pathname: routes.personalInformation,
            state: {
              email: signInData.email
            }
          })
        }
      } 
    };

    useEffect(()=>{
      handleCompleteSetup();
      if(id){
        localStorage.setItem('id', id);
      }
    }, [businessInfo, id])

    const handleCompleteSetup = async() => {
      if(id){
        const payload: CreateProfilePayload = {
          ...personalInfo,
          ...contactInfo,
          ...businessInfo,
          country: 'Canada',
          portalId: id,
          title: ''
        }
        const { portalId, firstName, lastName, userType } = payload
        const { data } = await createProfile(payload);
        if(data){
          // update identity with first name and last name
          const updateNamePayload: UpdateNamePayload = {
            id: portalId,
            firstName: firstName,
            lastName: lastName
          }
          await updateName(updateNamePayload);
          history.push({ pathname: appRoutes.portal, state: {
            userType: userType
          }});
        }
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
