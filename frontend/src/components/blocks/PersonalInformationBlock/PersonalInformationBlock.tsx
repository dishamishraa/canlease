import React from 'react';
import cx from 'classnames';

import styles from './PersonalInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import RadiobuttonList, { RadiobuttonListProps } from '../../organisms/RadiobuttonList';
import Button, { ButtonProps } from '../../atoms/Button';
import { PersonalInformation } from '../../pages/AuthPage/AuthPage';

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
  radiobuttonList: {
    radioButtonItems: [
    ],
  } as RadiobuttonListProps,
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

export type PersonalInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  firstNameTextField?: TextFieldProps;
  lastNameTextField?: TextFieldProps;
  radiobuttonList?: RadiobuttonListProps;
  nextButton?: ButtonProps;
  className?: string;
  setPersonalInfo?: React.Dispatch<React.SetStateAction<PersonalInformation>>;
};

const PersonalInformationBlock: React.FC<PersonalInformationBlockProps> = ({
  stepper,
  blockHeading,
  firstNameTextField,
  lastNameTextField,
  radiobuttonList,
  nextButton,
  className,
}) => (
    <div className={cx(styles.personalInformationBlock, className)}>
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
          <TextField
            className={styles.firstNameTextField}
            {...firstNameTextField} />
          <TextField
            className={styles.lastNameTextField}
            {...lastNameTextField} />
          <RadiobuttonList
            className={styles.radiobuttonList}
            {...radiobuttonList} />
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
);

PersonalInformationBlock.defaultProps = defaultProps;

export default PersonalInformationBlock;
