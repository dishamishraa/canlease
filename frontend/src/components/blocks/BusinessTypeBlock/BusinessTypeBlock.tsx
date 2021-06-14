import React from 'react';
import cx from 'classnames';

import styles from './BusinessTypeBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
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
  businessTypeRadioField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    radioButtonItem: {
      state: 'Unselected',
      icon: {
        asset: 'RadioButtonOff',
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
  businessPhoneField: {
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
  operatingSinceTextField: {
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
  bankruptcyRadioField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    radioButtonItem: {
      state: 'Unselected',
      icon: {
        asset: 'RadioButtonOff',
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
  detailsTextArea: {
    state: 'Default',
    type: 'TextArea',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'TextArea',
    },
  } as TextFieldProps,
  disclaimerText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
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

export type BusinessTypeBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  businessTypeRadioField?: RadioFieldProps;
  businessPhoneField?: TextFieldProps;
  operatingSinceTextField?: TextFieldProps;
  bankruptcyRadioField?: RadioFieldProps;
  detailsTextArea?: TextFieldProps;
  disclaimerText?: TextProps;
  nextButton?: ButtonProps;
  className?: string;
};

const BusinessTypeBlock: React.FC<BusinessTypeBlockProps> = ({
  stepper,
  blockHeading,
  businessTypeRadioField,
  businessPhoneField,
  operatingSinceTextField,
  bankruptcyRadioField,
  detailsTextArea,
  disclaimerText,
  nextButton,
  className,
}) => (
    <div className={cx(styles.businessTypeBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Stepper
            className={styles.stepper}
            {...stepper} />
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
        </div>
        <div className={styles.form}>
          <RadioField
            className={styles.businessTypeRadioField}
            {...businessTypeRadioField} />
          <TextField
            className={styles.businessPhoneField}
            {...businessPhoneField} />
          <TextField
            className={styles.operatingSinceTextField}
            {...operatingSinceTextField} />
          <RadioField
            className={styles.bankruptcyRadioField}
            {...bankruptcyRadioField} />
          <TextField
            className={styles.detailsTextArea}
            {...detailsTextArea} />
          <Text
            className={styles.disclaimerText}
            {...disclaimerText} />
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
);

BusinessTypeBlock.defaultProps = defaultProps;

export default BusinessTypeBlock;
