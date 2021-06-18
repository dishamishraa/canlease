import React from 'react';
import cx from 'classnames';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import styles from './UserProfile.module.scss';

import UserIcon, { UserIconProps } from '../../atoms/UserIcon';
import Icon, { IconProps } from '../../atoms/Icon';
import Button, { ButtonProps } from '../../atoms/Button';
import Text, { TextProps } from '../../atoms/Text';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

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
}) => {
  const currentStyle = styles[`userProfile${style}${state}`];

  let userIconView;
  let primaryView;
  let iconView;
  let secondaryView;

  const { t } = useTranslation();
  const history = useHistory();

  const handleSignIn = () => {
    history.push('/account/signin');
  };

  const handleSignUp = () => {
    history.push('/account/signUp');
  };

  primary = {
    ...primary,
    text: {
      ...primary?.text,
      value: t('button_text.sign_in'),
    },
    onButtonClicked: handleSignIn,
  };

  secondary = {
    ...secondary,
    text: {
      ...secondary?.text,
      value: t('button_text.sign_up'),
    },
    onButtonClicked: handleSignUp,
  };

  switch (state) {
    case 'SignedIn':
      userIconView = (
        <UserIcon
          className={styles.userIcon}
          {...userIcon} />
      );
      iconView = (
        <Icon
          className={styles.icon}
          {...icon} />
      );
      break;
    case 'None':
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
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {userIconView}
      {primaryView}
      {iconView}
      {secondaryView}
    </div>
  );
};

UserProfile.defaultProps = defaultProps;

export default UserProfile;
