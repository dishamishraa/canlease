import React from 'react';
import UserIcon from './UserIcon';

export default {
  title: 'atoms/UserIcon',
  component: UserIcon,
};

export const InitialsDefault: React.VFC<{}> = () => (
  <UserIcon
    type='Initials'
    style='Default'
    />
);
export const InitialsGreen: React.VFC<{}> = () => (
  <UserIcon
    type='Initials'
    style='Green'
    />
);
export const InitialsOrange: React.VFC<{}> = () => (
  <UserIcon
    type='Initials'
    style='Orange'
    />
);
