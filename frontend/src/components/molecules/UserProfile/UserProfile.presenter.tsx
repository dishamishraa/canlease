import React from 'react';
import { UserProfileProps, defaultProps as userProfileProps, UserProfileStateType } from './UserProfile';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ContextualMenuProps } from '../ContextualMenu';
import { UserIconProps } from '../../atoms/UserIcon';
import { UserIconStyleType } from '../../atoms/UserIcon/UserIcon';
import { ButtonProps } from '../../atoms/Button';
import { Account } from '../../../lib/types';
import { defaultProps as defaultMenuItemProp } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import useLogout from '../../../modules/auth/useLogout';

export type UserProfilePresenterProps = UserProfileProps & { 
  account: Account | null;
};

const getInitials = (account: Account | null): string => {
  if (account) {
    const { firstName, lastName } = account;
    const firstInitial = firstName.length > 0 ? firstName[0] : '';
    const secondInitial = lastName.length > 0 ? lastName[0] : '';
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }
  return '';
}

const getInitialStyle = (initials: string): UserIconStyleType => {
  let charSum = 0;
  // add up the sum of all initials char codes
  switch(initials.length) {
    case 1:
      charSum = initials.charCodeAt(0);
      break; 
    case 2:
      charSum = initials.charCodeAt(0) + initials.charCodeAt(1);
      break;
  }

  // perform modulus operation on the char sum to pick the icon style
  switch(charSum % 3) {
    case 1:
      return 'Green';
    case 2:
      return 'Orange';
    default:
      return 'Default';
  }
}

const withPresenter = (
  View: React.FC<UserProfileProps>,
): React.FC<UserProfilePresenterProps> => {
  const Presenter: React.FC<UserProfilePresenterProps> = (props) => {
    const { account, state } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const logout = useLogout();
    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
        {
            ...defaultMenuItemProp,
            text: {
                ...defaultMenuItemProp.text,
                value: t('user_profile.my_profile'),
            },
            onContextualMenuItemClicked: () => {
              history.push('/portal/profile');
            },
        },
        {
          ...defaultMenuItemProp,
          text: {
              ...defaultMenuItemProp.text,
              value: t('user_profile.contact_canlease'),
          },
          onContextualMenuItemClicked: () => {
            window.open('https://canlease.net/contact/', '_blank');
          },
      },
        {
            ...defaultMenuItemProp,
            text: {
                ...defaultMenuItemProp.text,
                value: t('user_profile.logout'),
            },
            onContextualMenuItemClicked: logout
        },
      ]}
    };

    const initials = getInitials(account);
    const userIcon: UserIconProps = {
      type: 'Initials',
      style: getInitialStyle(initials),
      value: initials,
    };

    const userName = {
      ...userProfileProps.text, 
      value: `${account?.firstName} ${account?.lastName}`,
    }

    const signInButton: ButtonProps = {
      ...userProfileProps.primary,
      text: {
        ...userProfileProps.primary.text,
        value: t('button_text.sign_in'),
      },
      onButtonClicked: () => {
          history.push('/account/signIn')
      }
    }

    const signUpButton: ButtonProps = {
        ...userProfileProps.secondary,
        text: {
          ...userProfileProps.secondary.text,
          value: t('button_text.sign_up'),
        },
        onButtonClicked: () => {
            history.push('/account/signUp')
        }
      }

      let currentState: UserProfileStateType = 'None';
      if(state !== 'None') {
        currentState = account ? 'SignedIn' : 'SignedOut';
      }
    return <View
      {...props}
      state={currentState}
      userIcon={userIcon}
      text={userName}
      primary={signInButton}
      secondary={signUpButton}
      contextualMenu={contextualMenu}
    />
  };
  return Presenter;
};

export default withPresenter;
