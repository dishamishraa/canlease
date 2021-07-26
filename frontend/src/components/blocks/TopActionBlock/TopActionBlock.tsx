import React from 'react';
import cx from 'classnames';

import styles from './TopActionBlock.module.scss';

import TextInput, { TextInputProps } from '../../atoms/TextInput';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import Button, { ButtonProps } from '../../atoms/Button';
import { ContentFilter, ContentType, ContentTypeTabs } from '../../../modules/types';
import { Profile } from '../../../modules/profile/types';

export const defaultProps = {
  textInput: {
    type: 'Text',
  } as TextInputProps,
  statusSearchField: {
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

export type TopActionBlockProps = {
  textInput?: TextInputProps;
  button?: ButtonProps;
  className?: string;
  searchQuery?: string;
  contentType?: ContentType;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  statusSearchField?: SelectFieldProps;
  statusFilter?: ContentFilter;
  tab?: ContentTypeTabs;
  setStatusFilter?: React.Dispatch<React.SetStateAction<ContentFilter>>;
  profile?: Profile | null;
};

const TopActionBlock: React.FC<TopActionBlockProps> = ({
  textInput,
  button,
  className,
  statusSearchField,
}) => (
    <div className={cx(styles.topActionBlock, className)}>
      <div className={styles.content}>
        <TextInput
          className={styles.textInput}
          {...textInput} />
        <SelectField
        className={styles.select}
        {...statusSearchField} />
        <Button
          className={styles.button}
          {...button} />
      </div>

    </div>
);

TopActionBlock.defaultProps = defaultProps;

export default TopActionBlock;
