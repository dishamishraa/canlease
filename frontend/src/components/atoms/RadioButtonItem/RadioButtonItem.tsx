import React from 'react';
import cx from 'classnames';

import styles from './RadioButtonItem.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type RadioButtonItemStateType = 'Unselected' | 'Selected';

export const defaultProps = {
  state: 'Selected' as RadioButtonItemStateType,
  icon: {
    asset: 'RadioButtonOn',
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
  icon?: IconProps;
  text?: TextProps;
  className?: string;
};

const RadioButtonItem: React.FC<RadioButtonItemProps> = ({
  state,
  icon,
  text,
  className,
}) => {

  const currentStyle = styles[`radioButtonItem${state}`];

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

RadioButtonItem.defaultProps = defaultProps;

export default RadioButtonItem;
