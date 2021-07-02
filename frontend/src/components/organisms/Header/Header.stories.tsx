import React from 'react';
import Header from './Header';

export default {
  title: 'organisms/Header',
  component: Header,
};

export const WithMenu: React.VFC<{}> = () => (
  <Header
    type='WithMenu'
    />
);
export const Default: React.VFC<{}> = () => (
  <Header
    type='Default'
    />
);
