import React from 'react';
import cx from 'classnames';

import styles from './QuoteBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import QuoteRateSection, { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import DetailItemList, { DetailItemListProps } from '../../organisms/DetailItemList';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  quoteRateSection: {
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
    rateCardList: {
      rateCards: [
      ],
    },
  } as QuoteRateSectionProps,
  disclaimerText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  validText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  detailItemList: {
    quoteDetailItems: [
    ],
  } as DetailItemListProps,
  learnMoreText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  viewQuoteButton: {
    type: 'Button',
    size: 'Large',
    fill: 'Colour',
    colour: 'Brand',
    text: {
      style: 'Basic100',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
<<<<<<< HEAD
=======
  saveQuoteButton: {
    type: 'Button',
    size: 'Large',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  learnMoreText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
>>>>>>> b3b16f6... commit before rebasing
};

export type QuoteBlockProps = {
  blockHeading?: TextProps;
  quoteRateSection?: QuoteRateSectionProps;
  disclaimerText?: TextProps;
  validText?: TextProps;
  detailItemList?: DetailItemListProps;
  learnMoreText?: TextProps;
  viewQuoteButton?: ButtonProps;
  saveQuoteButton?: ButtonProps;
  className?: string;
};

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  blockHeading,
  quoteRateSection,
  disclaimerText,
  validText,
  detailItemList,
  learnMoreText,
  viewQuoteButton,
  saveQuoteButton,
  className,
}) => {
  return (
    <div className={cx(styles.quoteBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <QuoteRateSection
        className={styles.quoteRateSection}
        {...quoteRateSection} />
      <Text
        className={styles.disclaimerText}
        {...disclaimerText} />
      <DetailItemList
        className={styles.detailItemList}
        {...detailItemList} />
      <Text
        className={styles.validText}
        {...validText} />
      <Text
        className={styles.learnMoreText}
        {...learnMoreText} />
      <div className={styles.buttonContainer}>
        <Button
          className={styles.viewQuoteButton}
          {...viewQuoteButton} />
        <Button
          className={styles.saveQuoteButton}
          {...saveQuoteButton} />
      </div>
      
    </div>
  );
};

QuoteBlock.defaultProps = defaultProps;

export default QuoteBlock;
