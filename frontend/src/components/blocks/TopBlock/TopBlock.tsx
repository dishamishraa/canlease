import React from 'react';
import cx from 'classnames';

import styles from './TopBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import Tabs, { TabsProps } from '../../organisms/Tabs';

export type TopBlockTypeType = 'WithTabs' | 'NoTabs';

export const defaultProps = {
  type: 'NoTabs' as TopBlockTypeType,
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
  type?: TopBlockTypeType;
  blockHeader?: BlockHeaderProps;
  tabs?: TabsProps;
  className?: string;
};

const TopBlock: React.FC<TopBlockProps> = ({
  type,
  blockHeader,
  tabs,
  className,
}) => {

  const currentStyle = styles[`topBlock${type}`];

  const blockHeaderView = (
    <BlockHeader
      className={styles.blockHeader}
      {...blockHeader} />
  );
  
  let tabsView;
  
  switch (type) {
    case 'WithTabs':
      tabsView = (
        <Tabs
          className={styles.tabs}
          {...tabs} />
      );
      break;
    case 'NoTabs':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {blockHeaderView}
      {tabsView}
    </div>
  );
};

TopBlock.defaultProps = defaultProps;

export default TopBlock;
