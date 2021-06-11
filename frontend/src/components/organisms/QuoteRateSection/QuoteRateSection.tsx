import React from 'react';
import cx from 'classnames';

import styles from './QuoteRateSection.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import DetailItemList, { DetailItemListProps } from '../DetailItemList';
import RateCardList, { RateCardListProps } from '../RateCardList';
import { RateCardProps } from '../../molecules/RateCard';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  detailItemList: {
    quoteDetailItems: [
    ],
  } as DetailItemListProps,
  rateCardList: {
    rateCards: [
    ],
  } as RateCardListProps,
};

export type QuoteRateSectionProps = {
  text?: TextProps;
  detailItemList?: DetailItemListProps;
  rateCardList?: RateCardListProps;
  className?: string;
};

const QuoteRateSection: React.FC<QuoteRateSectionProps> = ({
  text,
  detailItemList,
  rateCardList,
  className,
}) => {

  return (
    <div className={cx(styles.quoteRateSection, className)}>
      <Text
        className={styles.text}
        {...text} />
      <DetailItemList
        className={styles.detailItemList}
        {...detailItemList} />
      <RateCardList
        className={styles.rateCardList}
        {...rateCardList} 
        />
    </div>
  );
};

QuoteRateSection.defaultProps = defaultProps;

export default QuoteRateSection;
