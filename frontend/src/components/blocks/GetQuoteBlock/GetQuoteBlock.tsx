import React from 'react';
import cx from 'classnames';

import styles from './GetQuoteBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import Button, { ButtonProps } from '../../atoms/Button';
import { EquipmentLeaseInfo } from '../../../modules/types';
import { Profile } from '../../../modules/profile/types';
import { RateCard } from '../../../modules/rateCard/types';

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
  ratecardSelectField: {
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
  ratecardSelectField?: SelectFieldProps;
  feesTextField?: TextFieldProps;
  nextButton?: ButtonProps;
  className?: string;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  setEquipmentLeaseInfo?: (equipmentLeaseInfo: EquipmentLeaseInfo) => Promise<void>;
  profile?: Profile;
  rateCards?: RateCard[] | null;
};

const GetQuoteBlock: React.FC<GetQuoteBlockProps> = ({
  blockHeading,
  nameTextField,
  costTextField,
  leaseTypeSelectField,
  nextButton,
  className,
  profile,
  feesTextField,
  ratecardSelectField
}) => {
  if(profile?.userType === 'rep'){
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
        <TextField
          className={styles.feesTextField}
          {...feesTextField} />
        <SelectField
          className={styles.ratecardSelectField}
          {...ratecardSelectField} />
        <Button
          className={styles.nextButton}
          {...nextButton} />
      </div>
    )
  }
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
)};

GetQuoteBlock.defaultProps = defaultProps;

export default GetQuoteBlock;
