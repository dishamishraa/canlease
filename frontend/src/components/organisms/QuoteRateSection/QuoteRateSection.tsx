import React from 'react';
import cx from 'classnames';

import styles from './QuoteRateSection.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import QuoteDetails, { QuoteDetailsProps } from '../QuoteDetails';
import RateCardList, { RateCardListProps } from '../RateCardList';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  quoteDetails: {
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
  } as QuoteDetailsProps,
  rateCardList: {
    rateCards: [
    ],
  } as RateCardListProps,
};

export type QuoteRateSectionProps = {
  text?: TextProps;
  quoteDetails?: QuoteDetailsProps;
  rateCardList?: RateCardListProps;
  className?: string;
};

const QuoteRateSection: React.FC<QuoteRateSectionProps> = ({
  text,
  quoteDetails,
  rateCardList,
  className,
}) => {
  return (
    <div className={cx(styles.quoteRateSection, className)}>
      <Text
        className={styles.text}
        {...text} />
      <QuoteDetails
        className={styles.quoteDetails}
        {...quoteDetails} />
      <RateCardList
        className={styles.rateCardList}
        {...rateCardList} />
    </div>
  );
};

QuoteRateSection.defaultProps = defaultProps;

export default QuoteRateSection;
