import React from 'react';
import BlockHeader from './BlockHeader';

export default {
  title: 'molecules/BlockHeader',
  component: BlockHeader,
};

export const Heading1Default: React.VFC<{}> = () => (
  <BlockHeader
    style='Heading1'
    type='Default'
    />
);
export const Heading2WithButton: React.VFC<{}> = () => (
  <BlockHeader
    style='Heading2'
    type='WithButton'
    />
);