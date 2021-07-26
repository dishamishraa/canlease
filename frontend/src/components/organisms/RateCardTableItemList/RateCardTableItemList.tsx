import React from 'react';
import cx from 'classnames';

import styles from './RateCardTableItemList.module.scss';

import RateCardTableItem, { RateCardTableItemProps } from '../../molecules/RateCardTableItem';

export const defaultProps = {
  rateCardTableItems: [
  ] as RateCardTableItemProps[],
};

export type RateCardTableItemListProps = {
  rateCardTableItems?: RateCardTableItemProps[];
  className?: string;
};

const RateCardTableItemList: React.FC<RateCardTableItemListProps> = ({
  rateCardTableItems,
  className,
}) => {
  const rateCardTableItemArray = rateCardTableItems?.map((rateCardTableItem) => (
    <RateCardTableItem
      key={rateCardTableItem.id}
      className={styles.rateCardTableItem}
      {...rateCardTableItem} />
  ));

  return (
    <div className={cx(styles.rateCardTableItemList, className)}>
      {rateCardTableItemArray}
    </div>
  );
};

RateCardTableItemList.defaultProps = defaultProps;

export default RateCardTableItemList;
