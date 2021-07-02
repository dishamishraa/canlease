import React from 'react';
import cx from 'classnames';

import styles from './Toast.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type ToastTypeType = 'NoCloseButton' | 'WithCloseButton';
export type ToastStyleType = 'Dark' | 'Danger';

export const defaultProps = {
  type: 'NoCloseButton' as ToastTypeType,
  style: 'Danger' as ToastStyleType,
  leadingIcon: {
    asset: 'CloseCircleFilled',
    style: 'Red200',
  } as IconProps,
  text: {
    style: 'Red200',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  icon: {
    asset: 'Close',
    style: 'Basic100',
  } as IconProps,
};

export type ToastProps = {
  type?: ToastTypeType;
  style?: ToastStyleType;
  leadingIcon?: IconProps;
  text?: TextProps;
  className?: string;
  icon?: IconProps;
};

const Toast: React.FC<ToastProps> = ({
  type,
  style,
  leadingIcon,
  text,
  className,
  icon,
}) => {

  const currentStyle = styles[`toast${type}${style}`];

  const contentView = (
    <div className={styles.content}>
      <Icon
        className={styles.leadingIcon}
        {...leadingIcon} />
      <Text
        className={styles.text}
        {...text} />
    </div>
  );
  
  let iconView;
  
  switch (type) {
    case 'NoCloseButton':
      break;
    case 'WithCloseButton':
      iconView = (
        <Icon
          className={styles.icon}
          {...icon} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {contentView}
      {iconView}
    </div>
  );
};

Toast.defaultProps = defaultProps;

export default Toast;
