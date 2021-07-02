import React from 'react';
import cx from 'classnames';

import styles from './Tabs.module.scss';

import TabsList, { TabsListProps } from '../TabsList';
import Divider, { DividerProps } from '../../atoms/Divider';

export const defaultProps = {
  tabsList: {
    tabItems: [
    ],
  } as TabsListProps,
  divider: {
    style: 'Horizontal',
  } as DividerProps,
};

export type TabsProps = {
  tabsList?: TabsListProps;
  divider?: DividerProps;
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabsList,
  divider,
  className,
}) => {
  return (
    <div className={cx(styles.tabs, className)}>
      <TabsList
        className={styles.tabsList}
        {...tabsList} />
      <Divider
        className={styles.divider}
        {...divider} />
    </div>
  );
};

Tabs.defaultProps = defaultProps;

export default Tabs;
