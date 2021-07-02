import React from 'react';
import cx from 'classnames';

import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './AuthPage.module.scss';

import SignInBlock, { SignInBlockProps } from '../../blocks/SignInBlock';
import SignUpBlock, { SignUpBlockProps } from '../../blocks/SignUpBlock';
import ForgotPasswordBlock from '../../blocks/ForgotPasswordBlock';
import CreatePasswordBlock from '../../blocks/CreatePasswordBlock';
import DialogBlock from '../../blocks/DialogBlock';
import { ProtectedRoute } from '../../../modules/auth';
import PersonalInformationBlock from '../../blocks/PersonalInformationBlock';
import ContactInformationBlock from '../../blocks/ContactInformationBlock';
import BusinessInformationBlock from '../../blocks/BusinessInformationBlock';
import TopBar, { TopBarProps } from '../../organisms/TopBar';
import { AccountRequest, CreateProfilePayload, SignInPayload, UserType } from '../../../modules/types';

export const defaultProps = {
  topBar: {
    backButton: {
      type: 'IconTextButton',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      icon: {
        asset: 'ArrowLeft',
        style: 'Brand500',
      },
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as TopBarProps,
  block: {
    blockHeading: {
      style: 'Basic800',
      align: 'Center',
      size: 'Medium',
      type: 'Paragraph3',
    },
    description: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
    emailTextField: {
      state: 'Default',
      type: 'Text',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Text',
      },
    },
    passwordField: {
      state: 'Default',
      type: 'Password',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Password',
        icon: {
          asset: 'Show',
          style: 'Brand500',
        },
      },
    },
    nextButton: {
      type: 'Button',
      size: 'Large',
      fill: 'Basic',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    forgotPasswordButton: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as SignInBlockProps,
};


export type PersonalInformation = {
  firstName: string;
  lastName: string;
  userType: UserType;
}

export type ContactInformation = {
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  province: string;
}

export type BusinessInformation = {
  companyName: string;
  operatingName: string;
  businessSector: string;
  operatingSinceDate: string;
  businessPhone: string;
  website?: string;
}

export type AuthPageLocationState = {
  personalInfo: PersonalInformation,
  contactInfo: ContactInformation,
  businessInfo: PersonalInformation,
  email: string,
  id: string
}

export type AuthPageProps = {
  topBar?: TopBarProps;
  block?: SignInBlockProps;
  className?: string;
  signUpBlock?: SignUpBlockProps;
  signInBlock?: SignInBlockProps;
  handleCreateIdentityAccount?: (payload: AccountRequest) => void;
  handleSignIn?: (payload: SignInPayload) => void;
  handleGetProfile?: (id: string | number) => void;
  handleCompleteSetup?: () => void;
  setPersonalInfo?: React.Dispatch<React.SetStateAction<PersonalInformation>>;
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInformation>>;
  setBusinessInfo?: React.Dispatch<React.SetStateAction<BusinessInformation>>;
  handleToastDisplay?: (toastType: string) => void;
};

const routes = {
  signIn: '/account/signIn',
  forgotPassword: '/account/forgotPassword',
  resetLinkSent: '/account/resetSent',
  createPassword: '/account/createPassword',
  signUp: '/account/signUp',
  verifyEmail: '/account/verifyEmail',
  personalInformation: '/account/personalInformation',
  contactInformation: '/account/contactInformation',
  businessInformation: '/account/businessInformation',
  invalid: '/',
};

const AuthPage: React.FC<AuthPageProps> = ({
  topBar,
  block,
  className,
  signUpBlock,
  signInBlock,
  handleCreateIdentityAccount,
  handleSignIn,
  handleCompleteSetup,
  setPersonalInfo,
  setContactInfo,
  setBusinessInfo,
}) => (
    <div className={cx(styles.authPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <Switch>
        <Route exact path={routes.signIn}>
          <SignInBlock
            className={styles.block}
            {...signInBlock}
            handleSignIn={handleSignIn}
            />
        </Route>

        {/* Forgot password routes */}
        <Route exact path={routes.forgotPassword}>
          <ForgotPasswordBlock
            className={styles.block} />
        </Route>
        <Route exact path={routes.resetLinkSent}>
          <DialogBlock
            className={styles.block} />
        </Route>
        <Route exact path={routes.createPassword}>
          <CreatePasswordBlock
            className={styles.block} />
        </Route>

        {/* Sign up routes */}
        <Route exact path={routes.signUp}>
          <SignUpBlock
            className={styles.block}
            {...signUpBlock}
            handleCreateIdentityAccount={handleCreateIdentityAccount}
            />
        </Route>
        <Route exact path={routes.verifyEmail}>
          <DialogBlock
            className={styles.block} />
        </Route>

        {/* Account setup routes */}
        <ProtectedRoute exact path={routes.personalInformation}>
          <PersonalInformationBlock
            className={styles.block}
            setPersonalInfo={setPersonalInfo}
            />
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.contactInformation}>
          <ContactInformationBlock
            className={styles.block}
            setContactInfo={setContactInfo} />
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.businessInformation}>
          <BusinessInformationBlock
            className={styles.block}
            handleCompleteSetup={handleCompleteSetup}
            setBusinessInfo={setBusinessInfo} />
        </ProtectedRoute>

        <Route path={routes.invalid}>
          <Redirect to={routes.signIn}/>
        </Route>
      </Switch>

    </div>
);

AuthPage.defaultProps = defaultProps;

export default AuthPage;
