import React from 'react';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
};

export const Default: React.VFC<{}> = () => (
  <ProfilePage
    />
);