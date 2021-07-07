import React from 'react';
import cx from 'classnames';

import styles from './PortalLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';
import VendorDashboardPage, { VendorDashboardPageProps } from '../../pages/VendorDashboardPage';
import ApplicationPage, { ApplicationPageProps } from '../../pages/ApplicationPage';
import ContentPage, { ContentPageProps } from '../../pages/ContentPage';
import MenuBlock, { MenuBlockProps } from '../../blocks/MenuBlock';
import MainMenuItem from '../../atoms/MainMenuItem';
import { Switch, Route, Redirect } from 'react-router-dom';
import SimplePage, { SimplePageProps } from '../../pages/SimplePage/SimplePage';
import EndUserDashboardPage, { EndUserDashboardPageProps } from '../../pages/EndUserDashboardPage';

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
  vendorDashboardPage: {
    dataBlock: {
      blockHeader: {
        style: 'Heading1',
        type: 'Default',
        text: {
          style: 'Basic800',
          align: 'Left',
          size: 'Large',
          type: 'Heading1',
        },
      },
      dashboardCardList: {
        dashboardCards: [
        ],
      },
    },
    resourceBlock: {
      blockHeader: {
        style: 'Heading2',
        type: 'WithButton',
        text: {
          style: 'Basic800',
          align: 'Left',
          size: 'Large',
          type: 'Heading2',
        },
        button: {
          type: 'Button',
          size: 'Medium',
          fill: 'Basic',
          colour: 'Basic',
          text: {
            style: 'Brand500',
            align: 'Center',
            size: 'Small',
            type: 'ButtonGiant',
          },
        },
      },
      resourceCardList: {
        resourceCards: [
        ],
      },
    },
  } as VendorDashboardPageProps,
  menuBlock: {
    menuItemList: {
      mainMenuItems: [
      ],
    },
  } as MenuBlockProps,
};

export type PortalLayoutProps = {
  header?: HeaderProps;
  vendorDashboardPage?: VendorDashboardPageProps;
  applicationPage?: ApplicationPageProps;
  className?: string;
  menuBlock?: MenuBlockProps;
  contentPage?: ContentPageProps;
  simplePage?: SimplePageProps;
  endUserDashboardPage?: EndUserDashboardPageProps;
};

const routes = {
  vendorDashboard: '/portal/vendor/dashboard',
  userDashboard: '/portal/user/dashboard',
  application: '/portal/application',
  content: '/portal/content/:portalId',
  leasingQuote: '/portal/viewquote/:quoteId',
  invalid: '/',
};

const PortalLayout: React.FC<PortalLayoutProps> = ({
  header,
  vendorDashboardPage,
  applicationPage,
  className,
  menuBlock,
  contentPage,
  simplePage,
  endUserDashboardPage,
}) => {
        
  return (
    <div className={cx(styles.portalLayout, className)}>
      <Header
        className={styles.header}
        {...header} />
      <div className={styles.body}>
        <div className={styles.content}>
          <MenuBlock
            className={styles.menuBlock}
            {...menuBlock} />
          <Switch>
            <Route path={routes.application}>
                 <ApplicationPage
                className={styles.applicationPage}
                {...applicationPage} />
            </Route>
            <Route path={routes.vendorDashboard}>
                  <VendorDashboardPage
              className={styles.vendorDashboardPage}
              {...vendorDashboardPage} />;
            </Route>
            <Route path={routes.userDashboard}>
                  <EndUserDashboardPage
              className={styles.contentPage}
              {...endUserDashboardPage} />;
            </Route>
            <Route path={routes.content}>
                 <ContentPage
                className={styles.contentPage}
                {...contentPage} />
            </Route>
            <Route path={routes.leasingQuote}>
                 <SimplePage
                className={styles.contentPage}
                {...simplePage} />
            </Route>
            <Route path={routes.invalid}>
              <Redirect to={routes.vendorDashboard}/>
            </Route>
          </Switch>
        </div>
      </div>
  
    </div>
  );
}

PortalLayout.defaultProps = defaultProps;

export default PortalLayout;
