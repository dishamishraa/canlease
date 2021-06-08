import React from 'react';
import cx from 'classnames';

import styles from './Select.module.scss';

import Text, { TextProps } from '../Text';

import Icon, { IconProps } from '../Icon';

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
    <button
      type={selectType}
      onClick={onSelectClicked}
      className={cx(styles.select, className)}>
      <Text
        className={styles.text}
        {...text} />
      <Icon
        className={styles.icon}
        {...icon} />
    </button>
  );
};

Select.defaultProps = defaultProps;

export default Select;
