import React from 'react';
import cx from 'classnames';

import styles from './SelectField.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Select, { SelectProps } from '../../atoms/Select';

import { Dropdown } from 'react-bootstrap';
import ContextualMenu, { ContextualMenuProps } from '../ContextualMenu';

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
  contextualMenu?: ContextualMenuProps;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  select,
  className,
  contextualMenu,
}) => {
  return (
  <Dropdown className={cx(styles.selectField, className)}>
    <Text
      className={styles.label}
      {...label} />
    <Select
      className={styles.select} />
    <Dropdown.Menu align='right' className={cx(styles.selectField, className)}>
      <ContextualMenu {...contextualMenu} />
    </Dropdown.Menu>
  </Dropdown>
  );
};

SelectField.defaultProps = defaultProps;

export default SelectField;
