import React from 'react';
import Divider from './Divider';

export default {
  title: 'atoms/Divider',
  component: Divider,
};

export const Horizontal: React.VFC<{}> = () => (
  <Divider
    style='Horizontal'
    />
);
export const Vertical: React.VFC<{}> = () => (
  <Divider
    style='Vertical'
    />
);
