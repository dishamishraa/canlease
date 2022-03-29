import React from 'react';
import cx from 'classnames';

import styles from './TabsList.module.scss';

import TabItem, { TabItemProps } from '../../atoms/TabItem';

export const defaultProps = {
  tabItems: [
  ] as TabItemProps[],
};

export type TabsListProps = {
  tabItems?: TabItemProps[];
  className?: string;
};

const TabsList: React.FC<TabsListProps> = ({
  tabItems,
  className,
}) => {
  const tabItemArray = tabItems?.map((tabItem, index) => (
    <TabItem
      key={index}
      className={styles.tabItem}
      {...tabItem} />
  ));
  return (
    <div className={cx(styles.tabsList, className)}>
      {tabItemArray}
    </div>
  );
};

TabsList.defaultProps = defaultProps;

export default TabsList;
