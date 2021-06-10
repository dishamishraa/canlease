import React from 'react';
import QuotesPage from './QuotesPage';

export default {
  title: 'pages/QuotesPage',
  component: QuotesPage,
};

export const Default: React.VFC<{}> = () => (
  <QuotesPage
    />
);