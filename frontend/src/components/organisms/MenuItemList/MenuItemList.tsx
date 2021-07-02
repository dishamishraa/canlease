import React from 'react';
import cx from 'classnames';

import styles from './MenuItemList.module.scss';

import MainMenuItem, { MainMenuItemProps } from '../../atoms/MainMenuItem';

export const defaultProps = {
  mainMenuItems: [
  ] as MainMenuItemProps[],
};

export type MenuItemListProps = {
  mainMenuItems?: MainMenuItemProps[];
  className?: string;
};

const MenuItemList: React.FC<MenuItemListProps> = ({
  mainMenuItems,
  className,
}) => {
  const mainMenuItemArray = mainMenuItems?.map((mainMenuItem) => (
    <MainMenuItem
      className={styles.mainMenuItem}
      {...mainMenuItem} />
  ));
  return (
    <div className={cx(styles.menuItemList, className)}>
      {mainMenuItemArray}
    </div>
  );
};

MenuItemList.defaultProps = defaultProps;

export default MenuItemList;
