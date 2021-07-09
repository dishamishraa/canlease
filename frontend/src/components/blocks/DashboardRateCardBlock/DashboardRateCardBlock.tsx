import React from 'react';
import cx from 'classnames';

import styles from './DashboardRateCardBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import DashboardRateCardList, { DashboardRateCardListProps } from '../../organisms/DashboardRateCardList';

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
  dashboardRateCardList: {
    dashboardRateCards: [
    ],
  } as DashboardRateCardListProps,
};

export type DashboardRateCardBlockProps = {
  blockHeader?: BlockHeaderProps;
  dashboardRateCardList?: DashboardRateCardListProps;
  className?: string;
};

const DashboardRateCardBlock: React.FC<DashboardRateCardBlockProps> = ({
  blockHeader,
  dashboardRateCardList,
  className,
}) => (
    <div className={cx(styles.dashboardRateCardBlock, className)}>
      <BlockHeader
        className={styles.blockHeader}
        {...blockHeader} />
      <DashboardRateCardList
        className={styles.dashboardRateCardList}
        {...dashboardRateCardList} />
    </div>
);

DashboardRateCardBlock.defaultProps = defaultProps;

export default DashboardRateCardBlock;
