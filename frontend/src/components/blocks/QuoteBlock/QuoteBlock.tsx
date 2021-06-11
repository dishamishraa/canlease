import React from 'react';
import cx from 'classnames';

import styles from './QuoteBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import QuoteRateSection, { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import DetailItemList, { DetailItemListProps } from '../../organisms/DetailItemList';
import Button, { ButtonProps } from '../../atoms/Button';
import { Link } from 'react-router-dom';
import Toast, { ToastProps } from '../../atoms/Toast';
import { ToastTypeType, ToastStyleType } from '../../atoms/Toast/Toast';
import { IconProps } from '../../atoms/Icon';
import { defaultProps as QuoteDetailItemDefaultProp } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { defaultProps as RateDetailItemDefaultProp } from '../../molecules/RateDetailItem/RateDetailItem'

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
    detailItemList:{
      quoteDetails: {
        label: {
          style: 'Basic800',
          align: 'Left',
          size: 'Medium',
          type: 'Paragraph3',
        },
        text: {
          style: 'Basic800',
          align: 'Left',
          size: 'Medium',
          type: 'Paragraph2',
        },
      }
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
  expiryToast:{
    type: 'NoCloseButton' as ToastTypeType,
    style: 'Danger' as ToastStyleType,
    leadingIcon: {
      asset: 'CloseCircleFilled',
      style: 'Red200',
    } as IconProps,
    text: {
      style: 'Red200',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    } as TextProps,
    icon: {
      asset: 'Close',
      style: 'Basic100',
    } as IconProps,
  },
  quoteItemList: QuoteDetailItemDefaultProp,
  rateDetailItem: RateDetailItemDefaultProp
};

export type QuoteBlockProps = {
  blockHeading?: TextProps;
  quoteRateSection?: QuoteRateSectionProps;
  disclaimerText?: TextProps;
  validText?: TextProps;
  detailItemList?: DetailItemListProps;
  learnMoreText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
  quoteExpired?: boolean;
  expiryToast?: ToastProps;
};

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  blockHeading,
  quoteRateSection,
  disclaimerText,
  validText,
  detailItemList,
  learnMoreText,
  viewQuoteButton,
  className,
  quoteExpired,
  expiryToast
}) => {
  let toastDisplay;
  if(quoteExpired){
    toastDisplay = <Toast {...expiryToast}/>
  }
  return (
    <div className={cx(styles.quoteBlock, className)}>
      {toastDisplay}
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
      <div>
        <Text
          className={styles.learnMoreText}
          {...learnMoreText} />
      </div>
      <Button
          className={styles.viewQuoteButton}
          {...viewQuoteButton} />
      </div>
  );
};

QuoteBlock.defaultProps = defaultProps;

export default QuoteBlock;
