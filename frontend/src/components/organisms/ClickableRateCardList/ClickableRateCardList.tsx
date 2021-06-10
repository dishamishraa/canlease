import React from 'react';
import cx from 'classnames';

import styles from './ClickableRateCardList.module.scss';

import ClickableRateCard, { ClickableRateCardProps } from '../../molecules/ClickableRateCard';

export const defaultProps = {
  clickableRateCards: [
  ] as ClickableRateCardProps[],
};

export type ClickableRateCardListProps = {
  clickableRateCards?: ClickableRateCardProps[];
  className?: string;
};

const ClickableRateCardList: React.FC<ClickableRateCardListProps> = ({
  clickableRateCards,
  className,
}) => {
  const clickableRateCardArray = clickableRateCards?.map((clickableRateCard) => (
    <ClickableRateCard
      className={styles.clickableRateCard}
      {...clickableRateCard} />
  ));
  
  return (
    <div className={cx(styles.clickableRateCardList, className)}>
      {clickableRateCardArray}
    </div>
  );
};

ClickableRateCardList.defaultProps = defaultProps;

export default ClickableRateCardList;
