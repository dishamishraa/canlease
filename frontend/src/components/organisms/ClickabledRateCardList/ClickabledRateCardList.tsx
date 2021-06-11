import React from 'react';
import cx from 'classnames';

import styles from './ClickabledRateCardList.module.scss';

import ClickableRateCard, { ClickableRateCardProps } from '../../molecules/ClickableRateCard';

export const defaultProps = {
  clickableRateCards: [
  ] as ClickableRateCardProps[],
};

export type ClickabledRateCardListProps = {
  clickableRateCards?: ClickableRateCardProps[];
  className?: string;
};

const ClickabledRateCardList: React.FC<ClickabledRateCardListProps> = ({
  clickableRateCards,
  className,
}) => {
  const clickableRateCardArray = clickableRateCards?.map((clickableRateCard) => (
    <ClickableRateCard
      className={styles.clickableRateCard}
      {...clickableRateCard} />
  ));

  return (
    <div className={cx(styles.clickabledRateCardList, className)}>
      {clickableRateCardArray}
    </div>
  );
};

ClickabledRateCardList.defaultProps = defaultProps;

export default ClickabledRateCardList;
