import React from 'react';
import cx from 'classnames';

import styles from './PersonalInformationBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  description: {
    style: 'Brand500',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
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
  description?: TextProps;
  blockHeading?: TextProps;
  firstNameTextField?: TextFieldProps;
  lastNameTextField?: TextFieldProps;
  nextButton?: ButtonProps;
  className?: string;
};

const PersonalInformationBlock: React.FC<PersonalInformationBlockProps> = ({
  description,
  blockHeading,
  firstNameTextField,
  lastNameTextField,
  nextButton,
  className,
}) => {
  return (
    <div className={cx(styles.personalInformationBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Text
            className={styles.description}
            {...description} />
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
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
  );
};

PersonalInformationBlock.defaultProps = defaultProps;

export default PersonalInformationBlock;
