import React from 'react';
import cx from 'classnames';

import styles from './Header.module.scss';

import Logo, { LogoProps } from '../../atoms/Logo';
import UserProfile, { UserProfileProps } from '../../molecules/UserProfile';
import Divider, { DividerProps } from '../../atoms/Divider';

export const defaultProps = {
  logo: {
    size: 'Large',
  } as LogoProps,
  userProfile: {
    style: 'Light',
    state: 'SignedIn',
    userIcon: {
      type: 'Initials',
      style: 'Default',
    },
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
    icon: {
      asset: 'ChevronDown',
      style: 'Basic800',
    },
  } as UserProfileProps,
  divider: {
    style: 'Horizontal',
  } as DividerProps,
};

export type HeaderProps = {
  logo?: LogoProps;
  userProfile?: UserProfileProps;
  divider?: DividerProps;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({
  logo,
  userProfile,
  divider,
  className,
}) => {
  return (
    <div className={cx(styles.header, className)}>
      <div className={styles.content}>
        <Logo
          className={styles.logo}
          {...logo} />
        <UserProfile
          className={styles.userProfile}
          {...userProfile} />
      </div>
      <Divider
        className={styles.divider}
        {...divider} />
    </div>
  );
};

Header.defaultProps = defaultProps;

export default Header;
