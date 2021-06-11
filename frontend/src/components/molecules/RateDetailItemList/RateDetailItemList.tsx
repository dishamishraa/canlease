import React from 'react';
import cx from 'classnames';

import styles from './RateDetailItemList.module.scss';

import RateDetailItem, { RateDetailItemProps } from '../RateDetailItem';

export const defaultProps = {
  rateDetailItems: [
  ] as RateDetailItemProps[],
};

export type RateDetailItemListProps = {
  rateDetailItems?: RateDetailItemProps[];
  className?: string;
};

const RateDetailItemList: React.FC<RateDetailItemListProps> = ({
  rateDetailItems,
  className,
}) => {
  const rateDetailItemArray = rateDetailItems?.map((rateDetailItem) => (
    <RateDetailItem
      className={styles.rateDetailItem}
      {...rateDetailItem} />
  ));

  return (
    <div className={cx(styles.rateDetailItemList, className)}>
      {rateDetailItemArray}
    </div>
  );
};

RateDetailItemList.defaultProps = defaultProps;

export default RateDetailItemList;
