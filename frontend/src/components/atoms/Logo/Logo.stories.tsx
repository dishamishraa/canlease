import React from 'react';
import Logo from './Logo';

export default {
  title: 'atoms/Logo',
  component: Logo,
};

export const Large: React.VFC<{}> = () => (
  <Logo
    size='Large'
    />
);
export const Small: React.VFC<{}> = () => (
  <Logo
    size='Small'
    />
);
