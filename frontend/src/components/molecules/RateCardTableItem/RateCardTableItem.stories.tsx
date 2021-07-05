import React from 'react';
import RateCardTableItem from './RateCardTableItem';

export default {
  title: 'molecules/RateCardTableItem',
  component: RateCardTableItem,
};

export const Default: React.VFC<{}> = () => (
  <RateCardTableItem
    type='Default'
    />
);
export const Empty: React.VFC<{}> = () => (
  <RateCardTableItem
    type='Empty'
    />
);