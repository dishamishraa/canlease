import React from 'react';
import cx from 'classnames';

import styles from './SignUpBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import Button, { ButtonProps } from '../../atoms/Button';
import { AccountRequest } from '../../../modules/types';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Heading2',
  } as TextProps,
  bottomContent: {
    style: 'Basic800',
    align: 'Center',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  description: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
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
  signUpButton: {
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
    size: 'Large',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type SignUpBlockProps = {
  blockHeading?: TextProps;
  description?: TextProps;
  emailTextField?: TextFieldProps;
  createPasswordField?: TextFieldProps;
  confirmPasswordField?: TextFieldProps;
  signUpButton?: ButtonProps;
  bottomContent?: TextProps;
  signInButton?: ButtonProps;
  className?: string;
  handleCreateIdentityAccount?: (payload: AccountRequest) => void;
  accountExist?: boolean;
};

const SignUpBlock: React.FC<SignUpBlockProps> = ({
  blockHeading,
  description,
  emailTextField,
  createPasswordField,
  confirmPasswordField,
  signUpButton,
  bottomContent,
  signInButton,
  className,
}) => (
    <div className={cx(styles.signUpBlock, className)}>
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
            className={styles.emailTextField}
            {...emailTextField} />
          <TextField
            className={styles.createPasswordField}
            {...createPasswordField} />
          <TextField
            className={styles.confirmPasswordField}
            {...confirmPasswordField} />
          <Button
            className={styles.signUpButton}
            {...signUpButton} />
        </div>
      </div>
      <div className={styles.bottamContent}>
        <Text
          className={styles.blockHeading}
          {...bottomContent} />
        <Button
          className={styles.signInButton}
          {...signInButton} />
      </div>
    </div>
);

SignUpBlock.defaultProps = defaultProps;

export default SignUpBlock;
