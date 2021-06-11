import React from 'react';
import cx from 'classnames';

import styles from './ContactInfoCustomerBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import Button, { ButtonProps } from '../../atoms/Button';
import { ContactInfo } from '../../../lib/types';
export const defaultProps = {
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
  businessEmailTextField: {
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
  companyNameField: {
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
  viewQuoteButton: {
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

export type ContactInfoCustomerBlockProps = {
  blockHeading?: TextProps;
  nameTextField?: TextFieldProps;
  businessEmailTextField?: TextFieldProps;
  companyNameField?: TextFieldProps;
  disclaimerText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInfo  >>;
};

const ContactInfoCustomerBlock: React.FC<ContactInfoCustomerBlockProps> = ({
  blockHeading,
  nameTextField,
  businessEmailTextField,
  companyNameField,
  disclaimerText,
  viewQuoteButton,
  className,
}) => (
    <div className={cx(styles.contactInfoCustomerBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <TextField
        className={styles.nameTextField}
        {...nameTextField} />
      <TextField
        className={styles.businessEmailTextField}
        {...businessEmailTextField} />
      <TextField
        className={styles.companyNameField}
        {...companyNameField} />
      <Text
        className={styles.disclaimerText}
        {...disclaimerText} />
      <Button
        className={styles.viewQuoteButton}
        {...viewQuoteButton} />
    </div>
);

ContactInfoCustomerBlock.defaultProps = defaultProps;

export default ContactInfoCustomerBlock;
