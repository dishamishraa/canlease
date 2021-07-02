import React from 'react';
import TopBlock from './TopBlock';

export default {
  title: 'blocks/TopBlock',
  component: TopBlock,
};

export const WithTabs: React.VFC<{}> = () => (
  <TopBlock
    type='WithTabs'
    />
);
export const NoTabs: React.VFC<{}> = () => (
  <TopBlock
    type='NoTabs'
    />
);