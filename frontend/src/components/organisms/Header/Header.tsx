import React from 'react';
import cx from 'classnames';

import styles from './Header.module.scss';

import Icon, { IconProps } from '../../atoms/Icon';
import Logo, { LogoProps } from '../../atoms/Logo';
import UserProfile, { UserProfileProps } from '../../molecules/UserProfile';
import Divider, { DividerProps } from '../../atoms/Divider';

export type HeaderTypeType = 'WithMenu' | 'Default';

export const defaultProps = {
  type: 'Default' as HeaderTypeType,
  icon: {
    asset: 'Menu',
    style: 'Basic800',
  } as IconProps,
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
  type?: HeaderTypeType;
  icon?: IconProps;
  logo?: LogoProps;
  userProfile?: UserProfileProps;
  divider?: DividerProps;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({
  type,
  icon,
  logo,
  userProfile,
  divider,
  className,
}) => {
  const currentStyle = styles[`header${type}`];

  const dividerView = (
    <Divider
      className={styles.divider}
      {...divider} />
  );

  let contentView;

  switch (type) {
    case 'WithMenu':
      contentView = (
        <div className={styles.content}>
          <div className={styles.leftSideContent}>
            <Logo
              className={styles.logo}
              {...logo} />
            <Icon
              className={styles.icon}
              {...icon} />
          </div>
          <UserProfile
            className={styles.userProfile}
            {...userProfile} />
        </div>
      );
      break;
    case 'Default':
      contentView = (
        <div className={styles.content}>
          <div className={styles.leftSideContent}>
            <Logo
              className={styles.logo}
              {...logo} />
          </div>
          <UserProfile
            className={styles.userProfile}
            {...userProfile} />
        </div>
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {contentView}
      {dividerView}
    </div>
  );
};

Header.defaultProps = defaultProps;

export default Header;
