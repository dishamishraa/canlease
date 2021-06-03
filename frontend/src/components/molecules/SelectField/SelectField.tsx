import React from 'react';
import cx from 'classnames';

import styles from './SelectField.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Select, { SelectProps } from '../../atoms/Select';

export const defaultProps = {
  label: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
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
};

export type SelectFieldProps = {
  label?: TextProps;
  select?: SelectProps;
  className?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  select,
  className,
}) => {
  return (
    <div className={cx(styles.selectField, className)}>
      <Text
        className={styles.label}
        {...label} />
      <Select
        className={styles.select}
        {...select} />
    </div>
  );
};

SelectField.defaultProps = defaultProps;

export default SelectField;
