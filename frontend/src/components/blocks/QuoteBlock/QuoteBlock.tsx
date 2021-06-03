import React from 'react';
import cx from 'classnames';

import styles from './QuoteBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import QuoteRateSection, { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
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
    quoteDetails: {
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
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
  conditionsText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  validText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
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
  learnMoreText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type QuoteBlockProps = {
  blockHeading?: TextProps;
  quoteRateSection?: QuoteRateSectionProps;
  disclaimerText?: TextProps;
  conditionsText?: TextProps;
  validText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
  learnMoreText?: TextProps;
};

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  blockHeading,
  quoteRateSection,
  disclaimerText,
  conditionsText,
  validText,
  viewQuoteButton,
  className,
  learnMoreText,
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
      <Text
        className={styles.conditionsText}
        {...conditionsText} />
      <Text
        className={styles.validText}
        {...validText} />
      <Text
        className={styles.learnMoreText}
        {...learnMoreText} />
      <Button
        className={styles.viewQuoteButton}
        {...viewQuoteButton} />
    </div>
  );
};

QuoteBlock.defaultProps = defaultProps;

export default QuoteBlock;
