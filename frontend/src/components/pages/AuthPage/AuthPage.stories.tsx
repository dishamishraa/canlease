import React from 'react';
import AuthPage from './AuthPage';

export default {
  title: 'pages/AuthPage',
  component: AuthPage,
};

export const Default: React.VFC<{}> = () => (
  <AuthPage
    />
);
