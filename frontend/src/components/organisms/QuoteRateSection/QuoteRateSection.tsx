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

const rateCard: RateCardProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
    value: 'Rate Card'
  } as TextProps,
}

const rateCard2: RateCardProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
    value: 'Rate Card'
  } as TextProps,
}

const rateCard3: RateCardProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
    value: 'Rate Card'
  } as TextProps,
}

const rateCard4: RateCardProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
    value: 'Rate Card'
  } as TextProps,
}

const rateList = [rateCard, rateCard2, rateCard3, rateCard4];

const testRateCardListProps: RateCardListProps = {
  rateCards: rateList
}

const textTestProps: TextProps = {
  ...defaultProps.text,
  value: "Quote Detail"
}

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
        // {...rateCardList} 
        {...testRateCardListProps}
        />
    </div>
  );
};

QuoteRateSection.defaultProps = defaultProps;

export default QuoteRateSection;
