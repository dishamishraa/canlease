import React from 'react';
import cx from 'classnames';

import styles from './MainMenu.module.scss';

import MenuItemList, { MenuItemListProps } from '../../organisms/MenuItemList';

export const defaultProps = {
  menuItemList: {
    mainMenuItems: [
    ],
  } as MenuItemListProps,
};

export type MainMenuProps = {
  menuItemList?: MenuItemListProps;
  className?: string;
};

const MainMenu: React.FC<MainMenuProps> = ({
  menuItemList,
  className,
}) => (
    <div className={cx(styles.mainMenu, className)}>
      <MenuItemList
        className={styles.menuItemList}
        {...menuItemList} />
    </div>
);

MainMenu.defaultProps = defaultProps;

export default MainMenu;
