import React from 'react';
import cx from 'classnames';

import styles from './RateCardTable.module.scss';

import RateCardTableHeader, { RateCardTableHeaderProps } from '../../molecules/RateCardTableHeader';
import RateCardTableItemList, { RateCardTableItemListProps } from '../../organisms/RateCardTableItemList';

export const defaultProps = {
  rateCardTableHeader: {
    term: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    minMonthlyReturn: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    maxMonthlyReturn: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    interestRate: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    tenAtEndOfInterestRate: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    action: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
  } as RateCardTableHeaderProps,
  rateCardTableItemList: {
    rateCardTableItems: [
    ],
  } as RateCardTableItemListProps,
};

export type RateCardTableProps = {
  rateCardTableHeader?: RateCardTableHeaderProps;
  rateCardTableItemList?: RateCardTableItemListProps;
  className?: string;
};

const RateCardTable: React.FC<RateCardTableProps> = ({
  rateCardTableHeader,
  rateCardTableItemList,
  className,
}) => (
    <div className={cx(styles.rateCardTable, className)}>
      <RateCardTableHeader
        className={styles.rateCardTableHeader}
        {...rateCardTableHeader} />
      <RateCardTableItemList
        className={styles.rateCardTableItemList}
        {...rateCardTableItemList} />
    </div>
);

RateCardTable.defaultProps = defaultProps;

export default RateCardTable;
