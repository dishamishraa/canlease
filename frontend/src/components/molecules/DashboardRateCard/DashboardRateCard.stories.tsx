import React from 'react';
import DashboardRateCard from './DashboardRateCard';

export default {
  title: 'molecules/DashboardRateCard',
  component: DashboardRateCard,
};

export const RateCard: React.VFC<{}> = () => (
  <DashboardRateCard
    type='RateCard'
    />
);
export const AddRateCard: React.VFC<{}> = () => (
  <DashboardRateCard
    type='AddRateCard'
    />
);