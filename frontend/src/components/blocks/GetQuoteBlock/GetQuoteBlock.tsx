import React from 'react';
import cx from 'classnames';

import styles from './GetQuoteBlock.module.scss';

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
        style: 'Basic800',
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

export type GetQuoteBlockProps = {
  blockHeading?: TextProps;
  nameTextField?: TextFieldProps;
  costTextField?: TextFieldProps;
  leaseTypeSelectField?: SelectFieldProps;
  nextButton?: ButtonProps;
  className?: string;
};

const GetQuoteBlock: React.FC<GetQuoteBlockProps> = ({
  blockHeading,
  nameTextField,
  costTextField,
  leaseTypeSelectField,
  nextButton,
  className,
}) => {
  return (
    <div className={cx(styles.getQuoteBlock, className)}>
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
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
  );
};

GetQuoteBlock.defaultProps = defaultProps;

export default GetQuoteBlock;
