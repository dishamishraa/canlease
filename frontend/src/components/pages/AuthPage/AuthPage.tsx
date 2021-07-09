import React from 'react';
import cx from 'classnames';

import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './AuthPage.module.scss';

import SignInBlock from '../../blocks/SignInBlock';
import SignUpBlock from '../../blocks/SignUpBlock';
import ForgotPasswordBlock from '../../blocks/ForgotPasswordBlock';
import CreatePasswordBlock from '../../blocks/CreatePasswordBlock';
import DialogBlock from '../../blocks/DialogBlock';
import { ProtectedRoute } from '../../../modules/auth';
import PersonalInformationBlock from '../../blocks/PersonalInformationBlock';
import ContactInformationBlock from '../../blocks/ContactInformationBlock';
import BusinessInformationBlock from '../../blocks/BusinessInformationBlock';
import TopBar from '../../organisms/TopBar';
import { SignInPayload, SignUpPayload } from '../../../modules/account/types';
import { BusinessInformation, ContactInformation, PersonalInformation } from '../../../modules/types';

export const defaultProps = {
};

export type AuthPageProps = {
  className?: string;
  showBackButton?: boolean;
  email?: string;
  handleSignUp?: (payload: SignUpPayload) => void;
  handleSignIn?: (payload: SignInPayload) => void;
  handleGetProfile?: (id: string | number) => void;
  setPersonalInfo?: React.Dispatch<React.SetStateAction<PersonalInformation>>;
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInformation>>;
  setBusinessInfo?: React.Dispatch<React.SetStateAction<BusinessInformation>>;
  handleToastDisplay?: (toastType: string) => void;
};

export const routes = {
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
  className,
  showBackButton,
  email,
  handleSignUp,
  handleSignIn,
  setPersonalInfo,
  setContactInfo,
  setBusinessInfo,
}) => (
    <div className={cx(styles.authPage, className)}>
      <TopBar
        className={styles.topBar}
        showBackButton={showBackButton} />
      <Switch>
        <Route exact path={routes.signIn}>
          <SignInBlock
            className={styles.block}
            handleSignIn={handleSignIn} />
        </Route>

        {/* Forgot password routes */}
        <Route exact path={routes.forgotPassword}>
          <ForgotPasswordBlock
            className={styles.block} />
        </Route>
        <Route exact path={routes.resetLinkSent}>
          <DialogBlock
            className={styles.block}
            contentType='ResetLink'
            email={email} />
        </Route>
        <Route exact path={routes.createPassword}>
          <CreatePasswordBlock
            className={styles.block} />
        </Route>

        {/* Sign up routes */}
        <Route exact path={routes.signUp}>
          <SignUpBlock
            className={styles.block}
            handleSignUp={handleSignUp}
            />
        </Route>
        <Route exact path={routes.verifyEmail}>
          <DialogBlock
            className={styles.block}
            contentType='VerifyEmail'
            email={email} />
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
