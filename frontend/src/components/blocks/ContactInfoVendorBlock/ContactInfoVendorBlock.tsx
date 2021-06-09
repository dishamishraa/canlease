import React from 'react';
import cx from 'classnames';

import styles from './ContactInfoVendorBlock.module.scss';

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
  blockVendorHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  vendorNameTextField: {
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
  vendorBusinessEmailTextField: {
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
  vendorCompanyNameField: {
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

export type ContactInfoVendorBlockProps = {
  blockHeading?: TextProps;
  blockVendorHeading?: TextProps;
  vendorNameTextField?: TextFieldProps;
  vendorBusinessEmailTextField?: TextFieldProps;
  vendorCompanyNameField?: TextFieldProps;
  customerNameTextField?: TextFieldProps;
  customerEmailTextField?: TextFieldProps;
  customerCompanyNameTextField?: TextFieldProps;
  disclaimerText?: TextProps;
  viewQuoteButton?: ButtonProps;
  className?: string;
};

const ContactInfoVendorBlock: React.FC<ContactInfoVendorBlockProps> = ({
  blockHeading,
  blockVendorHeading,
  vendorNameTextField,
  vendorBusinessEmailTextField,
  vendorCompanyNameField,
  customerNameTextField,
  customerEmailTextField,
  customerCompanyNameTextField,
  disclaimerText,
  viewQuoteButton,
  className,
}) => {
  return (
    <div className={cx(styles.contactInfoVendorBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <TextField
        className={styles.vendorNameTextField}
        {...vendorNameTextField} />
      <TextField
        className={styles.vendorBusinessEmailTextField}
        {...vendorBusinessEmailTextField} />
      <TextField
        className={styles.vendorCompanyNameField}
        {...vendorCompanyNameField} />
      <Text
        className={styles.blockVendorHeading}
        {...blockVendorHeading} />
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
        className={styles.viewQuoteButton}
        {...viewQuoteButton} />
    </div>
  );
};

ContactInfoVendorBlock.defaultProps = defaultProps;

export default ContactInfoVendorBlock;
