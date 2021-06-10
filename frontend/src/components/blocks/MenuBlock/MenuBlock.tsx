import React from 'react';
import cx from 'classnames';

import styles from './MenuBlock.module.scss';

import MenuItemList, { MenuItemListProps } from '../../organisms/MenuItemList';

export const defaultProps = {
  menuItemList: {
    mainMenuItems: [
    ],
  } as MenuItemListProps,
};

export type MenuBlockProps = {
  menuItemList?: MenuItemListProps;
  className?: string;
};

const MenuBlock: React.FC<MenuBlockProps> = ({
  menuItemList,
  className,
}) => {
  return (
    <div className={cx(styles.menuBlock, className)}>
      <MenuItemList
        className={styles.menuItemList}
        {...menuItemList} />
    </div>
  );
};

MenuBlock.defaultProps = defaultProps;

export default MenuBlock;
