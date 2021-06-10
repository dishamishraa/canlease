import React from 'react';
import CheckboxItem from './CheckboxItem';

export default {
  title: 'atoms/CheckboxItem',
  component: CheckboxItem,
};

export const Unselected: React.VFC<{}> = () => (
  <CheckboxItem
    state='Unselected'
    />
);
export const Selected: React.VFC<{}> = () => (
  <CheckboxItem
    state='Selected'
    />
);