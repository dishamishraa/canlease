import React from 'react';
import cx from 'classnames';

import styles from './TopActionBlock.module.scss';

import TextInput, { TextInputProps } from '../../atoms/TextInput';
import Select, { SelectProps } from '../../atoms/Select';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  textInput: {
    type: 'Text',
  } as TextInputProps,
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
  } as SelectProps,
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
  select?: SelectProps;
  button?: ButtonProps;
  className?: string;
};

const TopActionBlock: React.FC<TopActionBlockProps> = ({
  textInput,
  select,
  button,
  className,
}) => {
  return (
    <div className={cx(styles.topActionBlock, className)}>
      <div className={styles.content}>
        <TextInput
          className={styles.textInput}
          {...textInput} />
        <Select
          className={styles.select}
          {...select} />
      </div>
      <Button
        className={styles.button}
        {...button} />
    </div>
  );
};

TopActionBlock.defaultProps = defaultProps;

export default TopActionBlock;
