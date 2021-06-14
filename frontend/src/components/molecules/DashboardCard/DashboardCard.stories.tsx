import React from 'react';
import DashboardCard from './DashboardCard';

export default {
  title: 'molecules/DashboardCard',
  component: DashboardCard,
};

export const DataCard: React.VFC<{}> = () => (
  <DashboardCard
    type='DataCard'
    />
);
export const LeaseCard: React.VFC<{}> = () => (
  <DashboardCard
    type='LeaseCard'
    />
);
export const CreateQuoteCard: React.VFC<{}> = () => (
  <DashboardCard
    type='CreateQuoteCard'
    />
);
