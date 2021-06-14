import React from 'react';
import cx from 'classnames';

import styles from './DataBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import DashboardCardList, { DashboardCardListProps } from '../../organisms/DashboardCardList';

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
  dashboardCardList: {
    dashboardCards: [
    ],
  } as DashboardCardListProps,
};

export type DataBlockProps = {
  blockHeader?: BlockHeaderProps;
  dashboardCardList?: DashboardCardListProps;
  className?: string;
};

const DataBlock: React.FC<DataBlockProps> = ({
  blockHeader,
  dashboardCardList,
  className,
}) => (
    <div className={cx(styles.dataBlock, className)}>
      <BlockHeader
        className={styles.blockHeader}
        {...blockHeader} />
      <DashboardCardList
        className={styles.dashboardCardList}
        {...dashboardCardList} />
    </div>
);

DataBlock.defaultProps = defaultProps;

export default DataBlock;
