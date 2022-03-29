import React from 'react';
import ClickableRateCard from './ClickableRateCard';

export default {
  title: 'molecules/ClickableRateCard',
  component: ClickableRateCard,
};

export const Default: React.VFC<{}> = () => (
  <ClickableRateCard
    state='Default'
    />
);
export const Selected: React.VFC<{}> = () => (
  <ClickableRateCard
    state='Selected'
    />
);
