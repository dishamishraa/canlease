import React from 'react';
import cx from 'classnames';

import styles from './ContextualMenuItemList.module.scss';

import ContextualMenuItem, { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';

export const defaultProps = {
  contextualMenuItems: [
  ] as ContextualMenuItemProps[],
};

export type ContextualMenuItemListProps = {
  contextualMenuItems?: ContextualMenuItemProps[];
  className?: string;
};

const ContextualMenuItemList: React.FC<ContextualMenuItemListProps> = ({
  contextualMenuItems,
  className,
}) => {
  const contextualMenuItemArray = contextualMenuItems?.map((contextualMenuItem) => (
    <ContextualMenuItem
      className={styles.contextualMenuItem}
      {...contextualMenuItem} />
  ));
  
  return (
    <div className={cx(styles.contextualMenuItemList, className)}>
      {contextualMenuItemArray}
    </div>
  );
};

ContextualMenuItemList.defaultProps = defaultProps;

export default ContextualMenuItemList;
