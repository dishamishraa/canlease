import React from 'react';
import cx from 'classnames';

import styles from './RateCardList.module.scss';

import RateCard, { RateCardProps } from '../../molecules/RateCard';

export const defaultProps = {
  rateCards: [
  ] as RateCardProps[],
};

export type RateCardListProps = {
  rateCards?: RateCardProps[];
  className?: string;
};

const RateCardList: React.FC<RateCardListProps> = ({
  rateCards,
  className,
}) => {
  const rateCardArray = rateCards?.map((rateCard) => (
    <RateCard
      className={styles.rateCard}
      {...rateCard} />
  ));
  return (
    <div className={cx(styles.rateCardList, className)}>
      {rateCardArray}
    </div>
  );
};

RateCardList.defaultProps = defaultProps;

export default RateCardList;
