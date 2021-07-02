import React from 'react';
import cx from 'classnames';

import styles from './GetQuoteRepBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import Button, { ButtonProps } from '../../atoms/Button';

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
  costTextField: {
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
  leaseTypeSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic500',
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
  feesTextField: {
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
  rateCardSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic500',
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

export type GetQuoteRepBlockProps = {
  blockHeading?: TextProps;
  nameTextField?: TextFieldProps;
  costTextField?: TextFieldProps;
  leaseTypeSelectField?: SelectFieldProps;
  feesTextField?: TextFieldProps;
  rateCardSelectField?: SelectFieldProps;
  nextButton?: ButtonProps;
  className?: string;
};

const GetQuoteRepBlock: React.FC<GetQuoteRepBlockProps> = ({
  blockHeading,
  nameTextField,
  costTextField,
  leaseTypeSelectField,
  feesTextField,
  rateCardSelectField,
  nextButton,
  className,
}) => {
  return (
    <div className={cx(styles.getQuoteRepBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <TextField
        className={styles.nameTextField}
        {...nameTextField} />
      <TextField
        className={styles.costTextField}
        {...costTextField} />
      <SelectField
        className={styles.leaseTypeSelectField}
        {...leaseTypeSelectField} />
      <TextField
        className={styles.feesTextField}
        {...feesTextField} />
      <SelectField
        className={styles.rateCardSelectField}
        {...rateCardSelectField} />
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
  );
};

GetQuoteRepBlock.defaultProps = defaultProps;

export default GetQuoteRepBlock;
