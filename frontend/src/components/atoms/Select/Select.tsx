import React from 'react';
import cx from 'classnames';

import styles from './Select.module.scss';

import Text, { TextProps } from '../Text';
import Icon, { IconProps } from '../Icon';

import { Dropdown } from 'react-bootstrap';

export type SelectSelectTypeType = 'button' | 'submit' | 'reset';

export const defaultProps = {
  text: {
    style: 'Basic400',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  icon: {
    asset: 'ChevronDown',
    style: 'Basic400',
  } as IconProps,
};

export type SelectItem = {
  label: string;
  value: string;
};

export type SelectProps = {
  selectType?: SelectSelectTypeType;
  onSelectClicked?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  text?: TextProps;
  icon?: IconProps;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  selectType,
  onSelectClicked,
  text,
  icon,
  className,
}) => {
  return (
    <Dropdown.Toggle
      type={selectType}
      // onClick={onSelectClicked}
      className={cx(styles.select, className)}>
      <Text
        className={styles.text}
        {...text} />
      <Icon
        className={styles.icon}
        {...icon} />
    </Dropdown.Toggle>
  );
};

Select.defaultProps = defaultProps;

export default Select;


{/* <Dropdown.Toggle as='div'>
<div className={cx(currentStyle, className)}>
  {userIconView}
  {userNameView}
  {chevronDownIconView}
</div> */}