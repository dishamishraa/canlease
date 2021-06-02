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
export const InitialsPink: React.VFC<{}> = () => (
  <UserIcon
    type='Initials'
    style='Pink'
    />
);
export const InitialsPurple: React.VFC<{}> = () => (
  <UserIcon
    type='Initials'
    style='Purple'
    />
);