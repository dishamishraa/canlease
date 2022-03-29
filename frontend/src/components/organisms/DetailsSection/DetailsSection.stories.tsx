import React from 'react';
import DetailsSection from './DetailsSection';

export default {
  title: 'organisms/DetailsSection',
  component: DetailsSection,
};

export const Default: React.VFC<{}> = () => (
  <DetailsSection
    type='Default'
    />
);
export const WithEditButton: React.VFC<{}> = () => (
  <DetailsSection
    type='WithEditButton'
    />
);
