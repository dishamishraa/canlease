import React from 'react';
import cx from 'classnames';

import styles from './ForgotPasswordBlock.module.scss';

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
  sendLinkButton: {
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

export type ForgotPasswordBlockProps = {
  blockHeading?: TextProps;
  description?: TextProps;
  emailTextField?: TextFieldProps;
  sendLinkButton?: ButtonProps;
  signInButton?: ButtonProps;
  className?: string;
};

const ForgotPasswordBlock: React.FC<ForgotPasswordBlockProps> = ({
  blockHeading,
  description,
  emailTextField,
  sendLinkButton,
  signInButton,
  className,
}) => {
  return (
    <div className={cx(styles.forgotPasswordBlock, className)}>
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
          <Button
            className={styles.sendLinkButton}
            {...sendLinkButton} />
        </div>
        <Button
          className={styles.signInButton}
          {...signInButton} />
      </div>
    </div>
  );
};

ForgotPasswordBlock.defaultProps = defaultProps;

export default ForgotPasswordBlock;
