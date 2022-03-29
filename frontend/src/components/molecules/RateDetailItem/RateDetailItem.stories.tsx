import React from 'react';
import RateDetailItem from './RateDetailItem';

export default {
  title: 'molecules/RateDetailItem',
  component: RateDetailItem,
};

export const PerMonth: React.VFC<{}> = () => (
  <RateDetailItem
    type='PerMonth'
    />
);
export const Text: React.VFC<{}> = () => (
  <RateDetailItem
    type='Text'
    />
);
