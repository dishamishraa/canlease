import React from 'react';
import CustomerPersonalInformationBlock from './CustomerPersonalInformationBlock';

export default {
  title: 'blocks/CustomerPersonalInformationBlock',
  component: CustomerPersonalInformationBlock,
};

export const Default: React.VFC<{}> = () => (
  <CustomerPersonalInformationBlock
    />
);