import React from 'react';
import cx from 'classnames';

import styles from './RateCard.module.scss';

import RateDetailItemList, { RateDetailItemListProps } from '../RateDetailItemList';

export const defaultProps = {
  rateDetailItemList: {
    rateDetailItems: [
    ],
  } as RateDetailItemListProps,
};

export type RateCardProps = {
  rateDetailItemList?: RateDetailItemListProps;
  className?: string;
};

const RateCard: React.FC<RateCardProps> = ({
  rateDetailItemList,
  className,
}) => (
    <div className={cx(styles.rateCard, className)}>
      <RateDetailItemList
        className={styles.rateDetailItemList}
        {...rateDetailItemList} />
    </div>
);

RateCard.defaultProps = defaultProps;

export default RateCard;
