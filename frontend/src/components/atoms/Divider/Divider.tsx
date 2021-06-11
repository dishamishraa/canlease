import React from 'react';
import cx from 'classnames';

import styles from './Divider.module.scss';

export type DividerStyleType = 'Horizontal' | 'Vertical';

export const defaultProps = {
  style: 'Vertical' as DividerStyleType,
};

export type DividerProps = {
  style?: DividerStyleType;
  className?: string;
};

const Divider: React.FC<DividerProps> = ({
  style,
  className,
}) => {
  const currentStyle = styles[`divider${style}`];

  return (
    <div className={cx(currentStyle, className)}/>
  );
};

Divider.defaultProps = defaultProps;

export default Divider;
