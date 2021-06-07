import React from 'react';
import cx from 'classnames';

import styles from './BusinessInformationBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
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
  fullLegalNameTextField: {
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
  operatingNameTextField: {
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
  businessSectorSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic400',
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
  operatingSinceTextField: {
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
  businessPhoneField: {
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
  websiteLinkTextField: {
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

export type BusinessInformationBlockProps = {
  description?: TextProps;
  blockHeading?: TextProps;
  fullLegalNameTextField?: TextFieldProps;
  operatingNameTextField?: TextFieldProps;
  businessSectorSelectField?: SelectFieldProps;
  operatingSinceTextField?: TextFieldProps;
  businessPhoneField?: TextFieldProps;
  websiteLinkTextField?: TextFieldProps;
  nextButton?: ButtonProps;
  className?: string;
};

const BusinessInformationBlock: React.FC<BusinessInformationBlockProps> = ({
  description,
  blockHeading,
  fullLegalNameTextField,
  operatingNameTextField,
  businessSectorSelectField,
  operatingSinceTextField,
  businessPhoneField,
  websiteLinkTextField,
  nextButton,
  className,
}) => {
  return (
    <div className={cx(styles.businessInformationBlock, className)}>
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
            className={styles.fullLegalNameTextField}
            {...fullLegalNameTextField} />
          <TextField
            className={styles.operatingNameTextField}
            {...operatingNameTextField} />
          <SelectField
            className={styles.businessSectorSelectField}
            {...businessSectorSelectField} />
          <TextField
            className={styles.operatingSinceTextField}
            {...operatingSinceTextField} />
          <TextField
            className={styles.businessPhoneField}
            {...businessPhoneField} />
          <TextField
            className={styles.websiteLinkTextField}
            {...websiteLinkTextField} />
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
  );
};

BusinessInformationBlock.defaultProps = defaultProps;

export default BusinessInformationBlock;
