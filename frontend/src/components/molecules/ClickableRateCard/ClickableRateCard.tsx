import React from 'react';
import cx from 'classnames';

import styles from './ClickableRateCard.module.scss';

import RateDetailItemList, { RateDetailItemListProps } from '../RateDetailItemList';

export type ClickableRateCardStateType = 'Default' | 'Selected';

export const defaultProps = {
  state: 'Selected' as ClickableRateCardStateType,
  rateDetailItemList: {
    rateDetailItems: [
    ],
  } as RateDetailItemListProps,
};

export type ClickableRateCardProps = {
  state?: ClickableRateCardStateType;
  rateDetailItemList?: RateDetailItemListProps;
  className?: string;
  onRateCardClicked?: (event?: React.MouseEvent<HTMLDivElement>) => void;
};

const ClickableRateCard: React.FC<ClickableRateCardProps> = ({
  state,
  rateDetailItemList,
  className,
  onRateCardClicked,
}) => {
  const currentStyle = styles[`clickableRateCard${state}`];

  const rateDetailItemListView = (
    <RateDetailItemList
      className={styles.rateDetailItemList}
      {...rateDetailItemList} />
  );
  switch (state) {
    case 'Default':
      break;
    case 'Selected':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}
      onClick={onRateCardClicked} >
      {rateDetailItemListView}
    </div>
  );
};

ClickableRateCard.defaultProps = defaultProps;

export default ClickableRateCard;
