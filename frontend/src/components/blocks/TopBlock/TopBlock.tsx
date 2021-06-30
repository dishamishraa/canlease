import React from 'react';
import cx from 'classnames';

import styles from './TopBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import Tabs, { TabsProps } from '../../organisms/Tabs';

export const defaultProps = {
  blockHeader: {
    style: 'Heading1',
    type: 'Default',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
  } as BlockHeaderProps,
  tabs: {
    tabsList: {
      tabItems: [
      ],
    },
    divider: {
      style: 'Horizontal',
    },
  } as TabsProps,
};

export type TopBlockProps = {
  blockHeader?: BlockHeaderProps;
  tabs?: TabsProps;
  className?: string;
  contentType?: string;
  tab?: 'Customer' | 'Personal';
  setTab?: React.Dispatch<React.SetStateAction<'Customer' | 'Personal'>>;
  hideTabs?: boolean;
};

const TopBlock: React.FC<TopBlockProps> = ({
  blockHeader,
  tabs,
  className,
  hideTabs,
}) => {
  let displayTabs;
  if (!hideTabs){
    displayTabs = (
      <Tabs
      className={styles.tabs}
      {...tabs} />
    );
  }
  return (
      <div className={cx(styles.topBlock, className)}>
        <BlockHeader
          className={styles.blockHeader}
          {...blockHeader} />
        {displayTabs}
      </div>
  );
}

TopBlock.defaultProps = defaultProps;

export default TopBlock;
