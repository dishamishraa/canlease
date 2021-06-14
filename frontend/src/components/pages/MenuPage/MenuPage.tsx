import React from 'react';
import cx from 'classnames';

import styles from './MenuPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import MenuItemList, { MenuItemListProps } from '../../organisms/MenuItemList';

export const defaultProps = {
  topBar: {
    backButton: {
      type: 'IconTextButton',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      icon: {
        asset: 'Close',
        style: 'Basic800',
      },
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as TopBarProps,
  menuItemList: {
    mainMenuItems: [
    ],
  } as MenuItemListProps,
};

export type MenuPageProps = {
  topBar?: TopBarProps;
  menuItemList?: MenuItemListProps;
  className?: string;
};

const MenuPage: React.FC<MenuPageProps> = ({
  topBar,
  menuItemList,
  className,
}) => (
    <div className={cx(styles.menuPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <MenuItemList
        className={styles.menuItemList}
        {...menuItemList} />
    </div>
);

MenuPage.defaultProps = defaultProps;

export default MenuPage;
