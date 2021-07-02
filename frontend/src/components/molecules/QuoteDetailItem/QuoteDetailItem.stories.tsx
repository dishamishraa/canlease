import React from 'react';
import QuoteDetailItem from './QuoteDetailItem';

export default {
  title: 'molecules/QuoteDetailItem',
  component: QuoteDetailItem,
};

export const Type1: React.VFC<{}> = () => (
  <QuoteDetailItem
    type='Type1'
    />
);
export const Type2: React.VFC<{}> = () => (
  <QuoteDetailItem
    type='Type2'
    />
);
export const Type3: React.VFC<{}> = () => (
  <QuoteDetailItem
    type='Type3'
    />
);
