import React from 'react';
import cx from 'classnames';

import styles from './CustomerPersonalInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import Button, { ButtonProps } from '../../atoms/Button';
import { ApplicationPersonalInfo } from '../../../modules/types';

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
  disclaimerText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  firstNameTextField: {
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
  lastNameTextField: {
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
  emailTextField: {
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
  phoneNumberTextField: {
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
  streetAddressTextField: {
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
  cityTextField: {
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
  postalCodeTextField: {
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
  provinceSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
      icon: {
        asset: 'ChevronDown',
        style: 'Basic800',
      },
    },
  } as SelectFieldProps,
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

export type CustomerPersonalInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  disclaimerText?: TextProps;
  firstNameTextField?: TextFieldProps;
  lastNameTextField?: TextFieldProps;
  emailTextField?: TextFieldProps;
  phoneNumberTextField?: TextFieldProps;
  streetAddressTextField?: TextFieldProps;
  cityTextField?: TextFieldProps;
  postalCodeTextField?: TextFieldProps;
  provinceSelectField?: SelectFieldProps;
  nextButton?: ButtonProps;
  className?: string;
  setPersonalInfo?: (personalInfo: ApplicationPersonalInfo) => void;
  personalInfo?: ApplicationPersonalInfo;
  stepperCurrentValue?: number;
  stepperTotalValue?: number;
};

const CustomerPersonalInformationBlock: React.FC<CustomerPersonalInformationBlockProps> = ({
  stepper,
  blockHeading,
  disclaimerText,
  firstNameTextField,
  lastNameTextField,
  emailTextField,
  phoneNumberTextField,
  streetAddressTextField,
  cityTextField,
  postalCodeTextField,
  provinceSelectField,
  nextButton,
  className,
}) => (
    <div className={cx(styles.customerPersonalInformationBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Stepper
            className={styles.stepper}
            {...stepper} />
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
          <Text
            className={styles.disclaimerText}
            {...disclaimerText} />
        </div>
        <div className={styles.form}>
          <TextField
            className={styles.firstNameTextField}
            {...firstNameTextField} />
          <TextField
            className={styles.lastNameTextField}
            {...lastNameTextField} />
          <TextField
            className={styles.emailTextField}
            {...emailTextField} />
          <TextField
            className={styles.phoneNumberTextField}
            {...phoneNumberTextField} />
          <TextField
            className={styles.streetAddressTextField}
            {...streetAddressTextField} />
          <TextField
            className={styles.cityTextField}
            {...cityTextField} />
          <TextField
            className={styles.postalCodeTextField}
            {...postalCodeTextField} />
          <SelectField
            className={styles.provinceSelectField}
            {...provinceSelectField} />
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
);

CustomerPersonalInformationBlock.defaultProps = defaultProps;

export default CustomerPersonalInformationBlock;
