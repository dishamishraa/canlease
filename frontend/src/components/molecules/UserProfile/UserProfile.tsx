import React from 'react';
import cx from 'classnames';

import { Dropdown } from 'react-bootstrap';
import styles from './UserProfile.module.scss';

import UserIcon, { UserIconProps } from '../../atoms/UserIcon';
import Icon, { IconProps } from '../../atoms/Icon';
import Button, { ButtonProps } from '../../atoms/Button';
import Text, { TextProps } from '../../atoms/Text';
import ContextualMenu, { ContextualMenuProps } from '../ContextualMenu';

export type UserProfileStyleType = 'Light';
export type UserProfileStateType = 'SignedIn' | 'None' | 'SignedOut';

export const defaultProps = {
  style: 'Light' as UserProfileStyleType,
  state: 'SignedOut' as UserProfileStateType,
  userIcon: {
    type: 'Initials',
    style: 'Default',
  } as UserIconProps,
  icon: {
    asset: 'ChevronDown',
    style: 'Basic800',
  } as IconProps,
  primary: {
    type: 'Button',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  secondary: {
    type: 'Button',
    size: 'Medium',
    fill: 'Colour',
    colour: 'Brand',
    text: {
      style: 'Basic100',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
};

export type UserProfileProps = {
  style?: UserProfileStyleType;
  state?: UserProfileStateType;
  userIcon?: UserIconProps;
  icon?: IconProps;
  className?: string;
  primary?: ButtonProps;
  secondary?: ButtonProps;
  text?: TextProps;
  contextualMenu?: ContextualMenuProps;
};

const UserProfile: React.FC<UserProfileProps> = ({
  style,
  state,
  userIcon,
  icon,
  className,
  primary,
  secondary,
  text,
  contextualMenu,
}) => {
  const currentStyle = styles[`userProfile${style}${state}`];

  let userIconView;
  let primaryView;
  let iconView;
  let textView;
  let secondaryView;
  let userProfileView;

  switch (state) {
    case 'SignedIn':
      userIconView = (
        <UserIcon
          className={styles.userIcon}
          {...userIcon} />
      );
      textView = (
        <Text
          className={styles.text}
          {...text} />
      );
      iconView = (
        <Icon
          className={styles.icon}
          {...icon} />
      );
      userProfileView = (
        <Dropdown
          className={styles.dropdown}>
          <Dropdown.Toggle as='div'>
            <div className={cx(currentStyle, className)}>
              {userIconView}
              {textView}
              {iconView}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align='right'>
            <ContextualMenu {...contextualMenu} />
          </Dropdown.Menu>
        </Dropdown>
      );
      break;
    case 'SignedOut':
      primaryView = (
        <Button
          className={styles.primary}
          {...primary} />
      );
      secondaryView = (
        <Button
          className={styles.secondary}
          {...secondary} />
      );
      userProfileView = (
        <div className={cx(currentStyle, className)}>
          {primaryView}
          {secondaryView}
        </div>
      );

      break;
    default:
      userProfileView = (
        <div className={cx(currentStyle, className)}/>
      );
      break;
  }

  return (
    <>
      {userProfileView}
    </>
  );
};

UserProfile.defaultProps = defaultProps;

export default UserProfile;
