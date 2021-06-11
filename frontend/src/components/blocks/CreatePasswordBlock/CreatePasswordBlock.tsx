import React from 'react';
import cx from 'classnames';

import styles from './CreatePasswordBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  description: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  createPasswordField: {
    state: 'Default',
    type: 'Password',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'Password',
      icon: {
        asset: 'Show',
        style: 'Brand500',
      },
    },
  } as TextFieldProps,
  confirmPasswordField: {
    state: 'Default',
    type: 'Password',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'Password',
      icon: {
        asset: 'Show',
        style: 'Brand500',
      },
    },
  } as TextFieldProps,
  saveButton: {
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
  signInButton: {
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
  } as ButtonProps,
};

export type CreatePasswordBlockProps = {
  blockHeading?: TextProps;
  description?: TextProps;
  createPasswordField?: TextFieldProps;
  confirmPasswordField?: TextFieldProps;
  saveButton?: ButtonProps;
  signInButton?: ButtonProps;
  className?: string;
};

const CreatePasswordBlock: React.FC<CreatePasswordBlockProps> = ({
  blockHeading,
  description,
  createPasswordField,
  confirmPasswordField,
  saveButton,
  signInButton,
  className,
}) => (
    <div className={cx(styles.createPasswordBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
          <Text
            className={styles.description}
            {...description} />
        </div>
        <div className={styles.form}>
          <TextField
            className={styles.createPasswordField}
            {...createPasswordField} />
          <TextField
            className={styles.confirmPasswordField}
            {...confirmPasswordField} />
          <Button
            className={styles.saveButton}
            {...saveButton} />
        </div>
        <Button
          className={styles.signInButton}
          {...signInButton} />
      </div>
    </div>
);

CreatePasswordBlock.defaultProps = defaultProps;

export default CreatePasswordBlock;
