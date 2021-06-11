import React from 'react';
import cx from 'classnames';

import styles from './ReviewCustomerInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import DetailsSection, { DetailsSectionProps } from '../../organisms/DetailsSection';
import Button, { ButtonProps } from '../../atoms/Button';

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
  quoteDetails: {
    type: 'WithEditButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    button: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  paymentDetails: {
    type: 'WithEditButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    button: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  customerPersonalDetails: {
    type: 'WithEditButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    button: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  customerBusinessDetails: {
    type: 'WithEditButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    button: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  assetDetails: {
    type: 'WithEditButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    button: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  nextButton: {
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

export type ReviewCustomerInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  quoteDetails?: DetailsSectionProps;
  paymentDetails?: DetailsSectionProps;
  customerPersonalDetails?: DetailsSectionProps;
  customerBusinessDetails?: DetailsSectionProps;
  assetDetails?: DetailsSectionProps;
  nextButton?: ButtonProps;
  className?: string;
};

const ReviewCustomerInformationBlock: React.FC<ReviewCustomerInformationBlockProps> = ({
  stepper,
  blockHeading,
  quoteDetails,
  paymentDetails,
  customerPersonalDetails,
  customerBusinessDetails,
  assetDetails,
  nextButton,
  className,
}) => (
    <div className={cx(styles.reviewCustomerInformationBlock, className)}>
      <div className={styles.topContent}>
        <Stepper
          className={styles.stepper}
          {...stepper} />
        <Text
          className={styles.blockHeading}
          {...blockHeading} />
      </div>
      <DetailsSection
        className={styles.quoteDetails}
        {...quoteDetails} />
      <DetailsSection
        className={styles.paymentDetails}
        {...paymentDetails} />
      <DetailsSection
        className={styles.customerPersonalDetails}
        {...customerPersonalDetails} />
      <DetailsSection
        className={styles.customerBusinessDetails}
        {...customerBusinessDetails} />
      <DetailsSection
        className={styles.assetDetails}
        {...assetDetails} />
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
);

ReviewCustomerInformationBlock.defaultProps = defaultProps;

export default ReviewCustomerInformationBlock;
