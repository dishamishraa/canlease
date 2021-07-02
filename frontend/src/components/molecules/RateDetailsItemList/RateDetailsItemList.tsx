import React from 'react';
import cx from 'classnames';

import styles from './RateDetailsItemList.module.scss';

import RateDetailItem, { RateDetailItemProps } from '../RateDetailItem';

export const defaultProps = {
  rateDetailItems: [
  ] as RateDetailItemProps[],
};

export type RateDetailsItemListProps = {
  rateDetailItems?: RateDetailItemProps[];
  className?: string;
};

const RateDetailsItemList: React.FC<RateDetailsItemListProps> = ({
  rateDetailItems,
  className,
}) => {
  const rateDetailItemArray = rateDetailItems?.map((rateDetailItem) => (
    <RateDetailItem
      className={styles.rateDetailItem}
      {...rateDetailItem} />
  ));
  return (
    <div className={cx(styles.rateDetailsItemList, className)}>
      {rateDetailItemArray}
    </div>
  );
};

RateDetailsItemList.defaultProps = defaultProps;

export default RateDetailsItemList;
