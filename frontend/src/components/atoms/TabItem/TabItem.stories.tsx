import React from 'react';
import TabItem from './TabItem';

export default {
  title: 'atoms/TabItem',
  component: TabItem,
};

export const Selected: React.VFC<{}> = () => (
  <TabItem
    state='Selected'
    />
);
export const Unselected: React.VFC<{}> = () => (
  <TabItem
    state='Unselected'
    />
);