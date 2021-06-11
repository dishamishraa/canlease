import React from 'react';
import cx from 'classnames';

import styles from './CustomerInfoBlock.module.scss';

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
  customerNameTextField: {
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
  customerEmailTextField: {
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
  customerCompanyNameTextField: {
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
  disclaimerText: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  button: {
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

export type CustomerInfoBlockProps = {
  blockHeading?: TextProps;
  customerNameTextField?: TextFieldProps;
  customerEmailTextField?: TextFieldProps;
  customerCompanyNameTextField?: TextFieldProps;
  disclaimerText?: TextProps;
  button?: ButtonProps;
  className?: string;
};

const CustomerInfoBlock: React.FC<CustomerInfoBlockProps> = ({
  blockHeading,
  customerNameTextField,
  customerEmailTextField,
  customerCompanyNameTextField,
  disclaimerText,
  button,
  className,
}) => (
    <div className={cx(styles.customerInfoBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <TextField
        className={styles.customerNameTextField}
        {...customerNameTextField} />
      <TextField
        className={styles.customerEmailTextField}
        {...customerEmailTextField} />
      <TextField
        className={styles.customerCompanyNameTextField}
        {...customerCompanyNameTextField} />
      <Text
        className={styles.disclaimerText}
        {...disclaimerText} />
      <Button
        className={styles.button}
        {...button} />
    </div>
);

CustomerInfoBlock.defaultProps = defaultProps;

export default CustomerInfoBlock;
