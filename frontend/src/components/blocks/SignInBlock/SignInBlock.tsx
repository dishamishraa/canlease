import React from 'react';
import cx from 'classnames';

import styles from './SignInBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import Button, { ButtonProps } from '../../atoms/Button';
import { SignInPayload } from '../../../modules/types';
import Toast, { ToastProps } from '../../atoms/Toast';
import { ToastTypeType, ToastStyleType, defaultProps as defaultToastProps } from '../../atoms/Toast/Toast';
import { IconProps } from '../../atoms/Icon';
import { isEmptyString } from '../../../lib/utils';

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
  passwordField: {
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
  forgotPasswordButton: {
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
  signUpButton: {
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

export type SignInBlockProps = {
  blockHeading?: TextProps;
  description?: TextProps;
  emailTextField?: TextFieldProps;
  passwordField?: TextFieldProps;
  nextButton?: ButtonProps;
  forgotPasswordButton?: ButtonProps;
  className?: string;
  bottomContent?: TextProps;
  signUpButton?: ButtonProps;
  handleSignIn?: (payload: SignInPayload) => void;
  toastProps?: ToastProps;
  toastMessage?: string;
  setToastMessage?: React.Dispatch<React.SetStateAction<string>>;
};

const SignInBlock: React.FC<SignInBlockProps> = ({
  blockHeading,
  description,
  emailTextField,
  passwordField,
  nextButton,
  forgotPasswordButton,
  className,
  bottomContent,
  signUpButton,
  toastMessage,
  toastProps
}) => {
  let toastDisplay;
  if(!isEmptyString(toastMessage)){
    toastDisplay = <Toast {...toastProps}/>
  }
  return (
    <div className={cx(styles.signInBlock, className)}>
      {toastDisplay}
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
            className={styles.passwordField}
            {...passwordField} />
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
        <Button
          className={styles.forgotPasswordButton}
          {...forgotPasswordButton} />
      </div>
      <div className={styles.bottamContent}>
        <Text
          className={styles.blockHeading}
          {...bottomContent} />
        <Button
          className={styles.nextButton}
          {...signUpButton} />
      </div>
    </div>
);
}

SignInBlock.defaultProps = defaultProps;

export default SignInBlock;
