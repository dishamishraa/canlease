import React from 'react';
import RadioButtonItem from './RadioButtonItem';

export default {
  title: 'atoms/RadioButtonItem',
  component: RadioButtonItem,
};

export const Unselected: React.VFC<{}> = () => (
  <RadioButtonItem
    state='Unselected'
    />
);
export const Selected: React.VFC<{}> = () => (
  <RadioButtonItem
    state='Selected'
    />
);