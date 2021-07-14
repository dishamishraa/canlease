import React from 'react';
import cx from 'classnames';

import styles from './StartApplicationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import Button, { ButtonProps } from '../../atoms/Button';
import { EquipmentLeaseInfo } from '../../../modules/types';

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
  nameTextField: {
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
  costTextField: {
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
  leaseTypeSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic500',
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

export type StartApplicationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  nameTextField?: TextFieldProps;
  costTextField?: TextFieldProps;
  leaseTypeSelectField?: SelectFieldProps;
  nextButton?: ButtonProps;
  className?: string;
  equipInfo?: EquipmentLeaseInfo;
  setEquipInfo?: React.Dispatch<React.SetStateAction<EquipmentLeaseInfo>>;
  stepperCurrentValue?: number,
  setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
  stepperTotalValue?: number,
  setStepperTotalValue?: React.Dispatch<React.SetStateAction<number>>;
  handleCreateQuote?: () => void;
};

const StartApplicationBlock: React.FC<StartApplicationBlockProps> = ({
  stepper,
  blockHeading,
  nameTextField,
  costTextField,
  leaseTypeSelectField,
  nextButton,
  className,
}) => (
    <div className={cx(styles.startApplicationBlock, className)}>
      <div className={styles.topContent}>
        <Stepper
          className={styles.stepper}
          {...stepper} />
        <Text
          className={styles.blockHeading}
          {...blockHeading} />
      </div>
      <TextField
        className={styles.nameTextField}
        {...nameTextField} />
      <TextField
        className={styles.costTextField}
        {...costTextField} />
      <SelectField
        className={styles.leaseTypeSelectField}
        {...leaseTypeSelectField} />
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
);

StartApplicationBlock.defaultProps = defaultProps;

export default StartApplicationBlock;
