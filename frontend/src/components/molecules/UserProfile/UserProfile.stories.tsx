import React from 'react';
import UserProfile from './UserProfile';

export default {
  title: 'molecules/UserProfile',
  component: UserProfile,
};

export const LightSignedIn: React.VFC<{}> = () => (
  <UserProfile
    style='Light'
    state='SignedIn'
    />
);
export const LightNone: React.VFC<{}> = () => (
  <UserProfile
    style='Light'
    state='None'
    />
);
export const LightSignedOut: React.VFC<{}> = () => (
  <UserProfile
    style='Light'
    state='SignedOut'
    />
);
