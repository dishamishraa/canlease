import React from 'react';
import cx from 'classnames';

import styles from './UserIcon.module.scss';

export type UserIconTypeType = 'Initials';
export type UserIconStyleType = 'Default' | 'Green' | 'Orange';

export const defaultProps = {
  type: 'Initials' as UserIconTypeType,
  style: 'Orange' as UserIconStyleType,
  background: BackgroundAsset,
  value: '',
};

export type UserIconProps = {
  type?: UserIconTypeType;
  style?: UserIconStyleType;
  background?: string;
  backgroundAlt?: string;
  value?: string;
  className?: string;
};

const UserIcon: React.FC<UserIconProps> = ({
  type,
  style,
  background,
  backgroundAlt,
  value,
  className,
}) => {

  const currentStyle = styles[`userIcon${type}${style}`];

  const backgroundView = (
    <img
      className={styles.background}
      alt={backgroundAlt}
      src={background} />
  );
  const valueView = (
    <p className={styles.value}>
      {value}
    </p>
  );
  
  
  switch (type) {
    case 'Initials':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {backgroundView}
      {valueView}
    </div>
  );
};

UserIcon.defaultProps = defaultProps;

export default UserIcon;
