import React from 'react';
import cx from 'classnames';

import styles from './QuoteSelectionBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import DetailsSection, { DetailsSectionProps } from '../../organisms/DetailsSection';
import ClickabledRateCardList, { ClickabledRateCardListProps } from '../../organisms/ClickabledRateCardList';
import Button, { ButtonProps } from '../../atoms/Button';
import ClickableRateCardList, { ClickableRateCardListProps } from '../../organisms/ClickableRateCardList';
import { Quote, QuoteOption } from '../../../modules/quote/types';

export const defaultProps = {
  stepper: {
    text: {
      style: 'Brand500',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
  } as StepperProps,
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  detailsSection: {
    type: 'Default',
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
  } as DetailsSectionProps,
  clickabledRateCardList: {
    clickableRateCards: [
    ],
  } as ClickabledRateCardListProps,
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
  clickableRateCardList: {
    clickableRateCards: [
    ],
  } as ClickableRateCardListProps,
};

export type QuoteSelectionBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  detailsSection?: DetailsSectionProps;
  clickabledRateCardList?: ClickabledRateCardListProps;
  disclaimerText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
  clickableRateCardList?: ClickableRateCardListProps;
  setQuoteSelected?: (quoteDetails: Quote, quoteSelected: QuoteOption)  => void;
  quoteSelected?: QuoteOption;
  stepperCurrentValue?: number,
  stepperTotalValue?: number,
};

const QuoteSelectionBlock: React.FC<QuoteSelectionBlockProps> = ({
  stepper,
  blockHeading,
  detailsSection,
  clickabledRateCardList,
  disclaimerText,
  viewQuoteButton,
  className,
  clickableRateCardList,
}) => (
    <div className={cx(styles.quoteSelectionBlock, className)}>
      <div className={styles.topContent}>
        <Stepper
          className={styles.stepper}
          {...stepper} />
        <Text
          className={styles.blockHeading}
          {...blockHeading} />
      </div>
      <DetailsSection
        className={styles.detailsSection}
        {...detailsSection} />
      <ClickableRateCardList
        className={styles.clickableRateCardList}
        {...clickableRateCardList} />
      <Text
        className={styles.disclaimerText}
        {...disclaimerText} />
      <ClickabledRateCardList
        className={styles.clickabledRateCardList}
        {...clickabledRateCardList} />
      <Button
        className={styles.viewQuoteButton}
        {...viewQuoteButton} />
    </div>
);

QuoteSelectionBlock.defaultProps = defaultProps;

export default QuoteSelectionBlock;
