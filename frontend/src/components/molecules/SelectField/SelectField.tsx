import React, { CSSProperties, useState } from 'react';
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
  selectId?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  select,
  className,
  contextualMenu,
  selectId,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
  <Dropdown className={cx(styles.selectField, className)} ref={ref} id={selectId}>
    <Text
        className={styles.label}
        {...label} />
    <Dropdown.Toggle>
      <Select
        className={cx(styles.select, className)} {...select}/>
    </Dropdown.Toggle>
    <Dropdown.Menu align='right' style={{width:ref.current?.clientWidth}}>
      <ContextualMenu 
        className={cx(styles.dropdownMenu, className)} 
        {...contextualMenu} />
    </Dropdown.Menu>
  </Dropdown>
  );
};

SelectField.defaultProps = defaultProps;

export default SelectField;
