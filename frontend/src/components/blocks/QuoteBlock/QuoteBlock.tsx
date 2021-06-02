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
};

export type QuoteBlockProps = {
  blockHeading?: TextProps;
  quoteRateSection?: QuoteRateSectionProps;
  disclaimerText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
};

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  blockHeading,
  quoteRateSection,
  disclaimerText,
  viewQuoteButton,
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
      <Button
        className={styles.viewQuoteButton}
        {...viewQuoteButton} />
    </div>
  );
};

QuoteBlock.defaultProps = defaultProps;

export default QuoteBlock;
