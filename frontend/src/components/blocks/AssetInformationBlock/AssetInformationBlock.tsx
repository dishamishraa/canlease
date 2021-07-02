import React from 'react';
import cx from 'classnames';

import styles from './AssetInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import DetailsSection, { DetailsSectionProps } from '../../organisms/DetailsSection';
import RadioField, { RadioFieldProps } from '../../molecules/RadioField';
import TextField, { TextFieldProps } from '../../molecules/TextField';
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
  assetConditionRadioField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    radioButtonItem: {
      state: 'Selected',
      icon: {
        asset: 'RadioButtonOn',
        style: 'Basic800',
      },
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
    },
  } as RadioFieldProps,
  ageOfAssetTextField: {
    state: 'Default',
    type: 'Text',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'Text',
    },
  } as TextFieldProps,
  expectedDeliveryDateTextField: {
    state: 'Default',
    type: 'Text',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'Text',
    },
  } as TextFieldProps,
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

export type AssetInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  detailsSection?: DetailsSectionProps;
  assetConditionRadioField?: RadioFieldProps;
  ageOfAssetTextField?: TextFieldProps;
  expectedDeliveryDateTextField?: TextFieldProps;
  nextButton?: ButtonProps;
  className?: string;
};

const AssetInformationBlock: React.FC<AssetInformationBlockProps> = ({
  stepper,
  blockHeading,
  detailsSection,
  assetConditionRadioField,
  ageOfAssetTextField,
  expectedDeliveryDateTextField,
  nextButton,
  className,
}) => {
  return (
    <div className={cx(styles.assetInformationBlock, className)}>
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
      <div className={styles.form}>
        <RadioField
          className={styles.assetConditionRadioField}
          {...assetConditionRadioField} />
        <TextField
          className={styles.ageOfAssetTextField}
          {...ageOfAssetTextField} />
        <TextField
          className={styles.expectedDeliveryDateTextField}
          {...expectedDeliveryDateTextField} />
      </div>
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
  );
};

AssetInformationBlock.defaultProps = defaultProps;

export default AssetInformationBlock;
