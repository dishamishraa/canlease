import React from 'react';
import cx from 'classnames';

import styles from './PortalLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';
import VendorDashboardPage, { VendorDashboardPageProps } from '../../pages/VendorDashboardPage';
import MenuBlock, { MenuBlockProps } from '../../blocks/MenuBlock';

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
  className?: string;
  menuBlock?: MenuBlockProps;
};

const PortalLayout: React.FC<PortalLayoutProps> = ({
  header,
  vendorDashboardPage,
  className,
  menuBlock,
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
          <VendorDashboardPage
            className={styles.vendorDashboardPage}
            {...vendorDashboardPage} />
        </div>
        <Header
          className={styles.header}
          {...header} />
        <div className={styles.content}>
          <VendorDashboardPage
            className={styles.vendorDashboardPage}
            {...vendorDashboardPage} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <MenuBlock
            className={styles.menuBlock}
            {...menuBlock} />
          <VendorDashboardPage
            className={styles.vendorDashboardPage}
            {...vendorDashboardPage} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <VendorDashboardPage
            className={styles.vendorDashboardPage}
            {...vendorDashboardPage} />
        </div>
      </div>
    </div>
  );
};

PortalLayout.defaultProps = defaultProps;

export default PortalLayout;
