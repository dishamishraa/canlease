/* eslint-disable default-case */
import React from 'react';
import cx from 'classnames';

import styles from './RadioButtonItem.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type RadioButtonItemStateType = 'Unselected' | 'Selected';

export const defaultProps = {
  state: 'Selected' as RadioButtonItemStateType,
  selectedIcon: {
    asset: 'RadioButtonOn',
    style: 'Brand500',
  } as IconProps,
  unselectedIcon: {
    asset: 'RadioButtonOff',
    style: 'Brand500',
  } as IconProps,
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
};

export type RadioButtonItemProps = {
  state?: RadioButtonItemStateType;
  selectedIcon?: IconProps;
  unselectedIcon?: IconProps;
  text?: TextProps;
  className?: string;
};

const RadioButtonItem: React.FC<RadioButtonItemProps> = ({
  state,
  selectedIcon,
  unselectedIcon,
  text,
  className,
}) => {
  const currentStyle = styles[`radioButtonItem${state}`];

  let iconView;
  const textView = (
    <Text
      className={styles.text}
      {...text} />
  );
  switch (state) {
    case 'Unselected':
      iconView = (
        <Icon
          className={styles.icon}
          {...unselectedIcon} />
      );
      break;
    case 'Selected':
      iconView = (
        <Icon
          className={styles.icon}
          {...selectedIcon} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {iconView}
      {textView}
    </div>
  );
};

RadioButtonItem.defaultProps = defaultProps;

export default RadioButtonItem;
