/* eslint-disable default-case */
import React from 'react';
import cx from 'classnames';

import styles from './CheckboxItem.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type CheckboxItemStateType = 'Unselected' | 'Selected';

export const defaultProps = {
  state: 'Selected' as CheckboxItemStateType,
  checkedIcon: {
    asset: 'CheckboxChecked',
    style: 'Brand500',
  } as IconProps,
  uncheckedIcon: {
    asset: 'CheckboxUnchecked',
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
  checkedIcon?: IconProps;
  uncheckedIcon?: IconProps;
  text?: TextProps;
  className?: string;
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  state,
  checkedIcon,
  uncheckedIcon,
  text,
  className,
}) => {
  const currentStyle = styles[`checkboxItem${state}`];

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
          {...uncheckedIcon} />
      );
      break;
    case 'Selected':
      iconView = (
        <Icon
          className={styles.icon}
          {...checkedIcon} />
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

CheckboxItem.defaultProps = defaultProps;

export default CheckboxItem;
