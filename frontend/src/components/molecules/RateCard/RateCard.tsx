import React from 'react';
import cx from 'classnames';

import styles from './RateCard.module.scss';

import RateDetailItemList, { RateDetailItemListProps } from '../RateDetailItemList';
import RateDetailsItemList, { RateDetailsItemListProps } from '../RateDetailsItemList';

export const defaultProps = {
  rateDetailItemList: {
    rateDetailItems: [
    ],
  } as RateDetailItemListProps,
  rateDetailsItemList: {
    rateDetailItems: [
    ],
  } as RateDetailsItemListProps,
};

export type RateCardProps = {
  rateDetailItemList?: RateDetailItemListProps;
  className?: string;
  rateDetailsItemList?: RateDetailsItemListProps;
};

const RateCard: React.FC<RateCardProps> = ({
  rateDetailItemList,
  className,
  rateDetailsItemList,
}) => {
  return (
    <div className={cx(styles.rateCard, className)}>
      <RateDetailsItemList
        className={styles.rateDetailsItemList}
        {...rateDetailsItemList} />
      <RateDetailItemList
        className={styles.rateDetailItemList}
        {...rateDetailItemList} />
    </div>
  );
};

RateCard.defaultProps = defaultProps;

export default RateCard;
