import React from 'react';
import cx from 'classnames';

import styles from './UserIcon.module.scss';

export type UserIconTypeType = 'Initials';
export type UserIconStyleType = 'Default' | 'Green' | 'Orange';

export const defaultProps = {
  type: 'Initials' as UserIconTypeType,
  style: 'Orange' as UserIconStyleType,
  value: '',
};

export type UserIconProps = {
  type?: UserIconTypeType;
  style?: UserIconStyleType;
  value?: string;
  className?: string;
};

const UserIcon: React.FC<UserIconProps> = ({
  type,
  style,
  value,
  className,
}) => {

  const currentStyle = styles[`userIcon${type}${style}`];

  let backgroundView;
  
  switch (type) {
    case 'Initials':
      backgroundView = (
        <div className={styles.background}>
          <p className={styles.value}>
            {value}
          </p>
        </div>
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {backgroundView}
    </div>
  );
};

UserIcon.defaultProps = defaultProps;

export default UserIcon;
