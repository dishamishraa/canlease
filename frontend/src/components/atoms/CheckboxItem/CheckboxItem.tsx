import React from 'react';
import cx from 'classnames';

import styles from './CheckboxItem.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type CheckboxItemStateType = 'Unselected' | 'Selected';

export const defaultProps = {
  state: 'Selected' as CheckboxItemStateType,
  icon: {
    asset: 'CheckboxChecked',
    style: 'Brand500',
  } as IconProps,
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
};

export type CheckboxItemProps = {
  state?: CheckboxItemStateType;
  icon?: IconProps;
  text?: TextProps;
  className?: string;
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  state,
  icon,
  text,
  className,
}) => {
  const currentStyle = styles[`checkboxItem${state}`];

  const iconView = (
    <Icon
      className={styles.icon}
      {...icon} />
  );
  const textView = (
    <Text
      className={styles.text}
      {...text} />
  );

  switch (state) {
    case 'Unselected':
      break;
    case 'Selected':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {iconView}
      {textView}
    </div>
  );
};

CheckboxItem.defaultProps = defaultProps;

export default CheckboxItem;
