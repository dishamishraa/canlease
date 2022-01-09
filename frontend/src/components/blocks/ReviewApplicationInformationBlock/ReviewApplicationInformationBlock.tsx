import React from 'react';
import cx from 'classnames';

import styles from './ReviewApplicationInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import DetailsSection, { DetailsSectionProps } from '../../organisms/DetailsSection';
import Button, { ButtonProps } from '../../atoms/Button';
import {
  AssetInfo, ApplicationBusinessInfo, ApplicationPersonalInfo, CreateApplicationState,
} from '../../../modules/types';
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
  sectionHeadingOne: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
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
  businessTypeDetails: {
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
  sectionHeadingTwo: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  personalDetails: {
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
  contactDetails: {
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
  profileBusinessDetails: {
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

export type ReviewApplicationInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  sectionHeadingOne?: TextProps;
  quoteDetails?: DetailsSectionProps;
  paymentDetails?: DetailsSectionProps;
  assetDetails?: DetailsSectionProps;
  businessTypeDetails?: DetailsSectionProps;
  sectionHeadingTwo?: TextProps;
  text?: TextProps;
  personalDetails?: DetailsSectionProps;
  contactDetails?: DetailsSectionProps;
  profileBusinessDetails?: DetailsSectionProps;
  nextButton?: ButtonProps;
  className?: string;
  quoteDetailsSelected?: Quote;
  quoteSelected?: QuoteOption;
  personalInfo?: ApplicationPersonalInfo;
  businessInfo?: ApplicationBusinessInfo;
  assetInfo?: AssetInfo;
  stepperCurrentValue?: number;
  stepperTotalValue?: number;
  customerPersonalInformation?: DetailsSectionProps;
  customerBusinessInformation?: DetailsSectionProps;
  handleEditClicked?: (page: string) => void;
  state?: CreateApplicationState | undefined;
};

const ReviewApplicationInformationBlock: React.FC<ReviewApplicationInformationBlockProps> = ({
  stepper,
  blockHeading,
  sectionHeadingOne,
  quoteDetails,
  paymentDetails,
  assetDetails,
  businessTypeDetails,
  sectionHeadingTwo,
  text,
  personalDetails,
  contactDetails,
  profileBusinessDetails,
  nextButton,
  className,
  customerPersonalInformation,
  customerBusinessInformation,
  stepperCurrentValue,
  state,
}) => {
  let additionalCustomerFields;
  let additionalPersonalFields;
  if (state?.fromTab === 'Personal') {
    additionalPersonalFields = <>
        <DetailsSection
          className={styles.businessTypeDetails}
          {...businessTypeDetails} />
        <Text
          className={styles.sectionHeadingTwo}
          {...sectionHeadingTwo} />
        <Text
          className={styles.text}
          {...text} />
        <DetailsSection
          className={styles.personalDetails}
          {...personalDetails} />
        <DetailsSection
          className={styles.contactDetails}
          {...contactDetails} />
        <DetailsSection
          className={styles.profileBusinessDetails}
          {...profileBusinessDetails} />
    </>;
  } else if (state?.fromTab === 'Customer') {
    additionalCustomerFields = <>
      <DetailsSection
        className={styles.businessTypeDetails}
        {...customerPersonalInformation} />
      <DetailsSection
        className={styles.businessTypeDetails}
        {...customerBusinessInformation} />
    </>;
  }

  return (
      <div className={cx(styles.reviewApplicationInformationBlock, className)}>
        <div className={styles.topContent}>
          <Stepper
            className={styles.stepper}
            {...stepper} />
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
        </div>
        {stepperCurrentValue === 4 && <Text
          className={styles.sectionHeadingOne}
          {...sectionHeadingOne} />}
        <DetailsSection
          className={styles.quoteDetails}
          {...quoteDetails} />
        <DetailsSection
          className={styles.paymentDetails}
          {...paymentDetails} />
        {additionalCustomerFields}
        <DetailsSection
          className={styles.assetDetails}
          {...assetDetails} />
        {additionalPersonalFields}
        <Button
          className={styles.nextButton}
          {...nextButton} />
      </div>
  );
};

ReviewApplicationInformationBlock.defaultProps = defaultProps;

export default ReviewApplicationInformationBlock;
