import React from 'react';
import MainMenuItem from './MainMenuItem';

export default {
  title: 'atoms/MainMenuItem',
  component: MainMenuItem,
};

export const Default: React.VFC<{}> = () => (
  <MainMenuItem
    type='Default'
    />
);
export const Selected: React.VFC<{}> = () => (
  <MainMenuItem
    type='Selected'
    />
);