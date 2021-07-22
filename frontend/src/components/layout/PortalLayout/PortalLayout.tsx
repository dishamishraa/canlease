import React from 'react';
import cx from 'classnames';

import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './PortalLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';

import EndUserDashboardPage from '../../pages/EndUserDashboardPage';
import VendorDashboardPage from '../../pages/VendorDashboardPage';
import ApplicationPage from '../../pages/ApplicationPage';
import ContentPage from '../../pages/ContentPage';
import SimplePage from '../../pages/SimplePage';
import MenuBlock from '../../blocks/MenuBlock';
import { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import RateCardPage from '../../pages/RateCardPage';
import ProfilePage from '../../pages/ProfilePage';
import RateCardDetailsPage from '../../pages/RateCardDetailsPage';

export const defaultProps = {
  header: {
    type: 'WithMenu',
    logo: {
      size: 'Large',
    },
    userProfile: {
      style: 'Light',
      state: 'SignedIn',
      userIcon: {
        type: 'Initials',
        style: 'Default',
      },
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
      icon: {
        asset: 'ChevronDown',
        style: 'Basic800',
      },
    },
    divider: {
      style: 'Horizontal',
    },
  } as HeaderProps,
};

export type PortalLayoutProps = {
  header?: HeaderProps;
  className?: string;
};

export const routes = {
  dashboard: '/portal/dashboard',
  applications: '/portal/applications',
  application: '/portal/application',
  quotes: '/portal/quotes',
  quote: '/portal/quote',
  profile: '/portal/profile',
  ratecard: '/portal/ratecard',
  invalid: '/',
  // temporary route for validation purpose
  detail: '/portal/ratecardDetail/:rateId'
};

const PortalLayout: React.FC<PortalLayoutProps> = ({
  header,
  className,
}) => {
  const { profile } = useContext(AuthContext);
  const userType = profile?.userType || 'customer';
  const DashboardPage = userType === 'customer' ? EndUserDashboardPage : VendorDashboardPage;
  return (
    <div className={cx(styles.portalLayout, className)}>
      <Header
        className={styles.header}
        {...header} />
      <div className={styles.body}>
        <div className={styles.content}>
          <MenuBlock
            className={styles.menuBlock} />
          <Switch>
            <Route path={routes.dashboard}>
              <DashboardPage
                className={styles.page}/>
            </Route>
            <Route path={[routes.quotes, routes.applications]}>
              <ContentPage
                className={styles.page} />
            </Route>
            <Route path={routes.quote}>
              <SimplePage
                flowType='createQuote'
                profile={profile || undefined}
                className={styles.page} />
            </Route>
            <Route path={routes.application}>
              <ApplicationPage
                className={styles.page} />
            </Route>
            <Route path={routes.ratecard}>
              <RateCardPage
                className={styles.page} />
            </Route>
            <Route path={routes.profile}>
              <ProfilePage
                className={styles.page} />
            </Route>
            <Route path={routes.detail}>
              <RateCardDetailsPage
                className={styles.page} />
            </Route>
            <Route path={routes.invalid}>
              <Redirect to={routes.dashboard}/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

PortalLayout.defaultProps = defaultProps;

export default PortalLayout;
