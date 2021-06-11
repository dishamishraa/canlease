import React from 'react';
import cx from 'classnames';

import styles from './ContextualMenu.module.scss';

import ContextualMenuItemList, { ContextualMenuItemListProps } from '../ContextualMenuItemList';

export const defaultProps = {
  contextualMenuItemList: {
    contextualMenuItems: [
    ],
  } as ContextualMenuItemListProps,
};

export type ContextualMenuProps = {
  contextualMenuItemList?: ContextualMenuItemListProps;
  className?: string;
};

const ContextualMenu: React.FC<ContextualMenuProps> = ({
  contextualMenuItemList,
  className,
}) => (
    <div className={cx(styles.contextualMenu, className)}>
      <ContextualMenuItemList
        className={styles.contextualMenuItemList}
        {...contextualMenuItemList} />
    </div>
);

ContextualMenu.defaultProps = defaultProps;

export default ContextualMenu;
