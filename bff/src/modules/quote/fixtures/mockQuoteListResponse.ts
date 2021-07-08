import { Quote } from '../types';

const mockQuoteListResponse: Quote[] = [
  {
    quoteId: 'id3',
    asset: 'fourthAsset',
    applicationAmount: 100,
    quoteOptions: [
      {
        monthlyAmount: 0,
        term: '12M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
    ],
    quoteExpiryDate: '2021-08-05T19:23:28.744Z',
    leaseType: 'stretch',
  },
  {
    quoteId: 'string',
    asset: 'firstAsset',
    applicationAmount: 200,
    quoteOptions: [
      {
        monthlyAmount: 0,
        term: '12M',
        financeRate: 0,
        purchaseOptionDate: '2021-07-14T19:23:28.744Z',
      },
    ],
    quoteExpiryDate: '2021-06-22T19:23:28.744Z',
    leaseType: 'stretch',
  },
  {
    quoteId: 'id',
    asset: 'secondAsset',
    applicationAmount: 100,
    quoteOptions: [
      {
        monthlyAmount: 0,
        term: '12M',
        financeRate: 0,
        purchaseOptionDate: '2021-09-14T19:23:28.744Z',
      },
    ],
    quoteExpiryDate: '2020-07-05T19:23:28.744Z',
    leaseType: 'stretch',
  },
  {
    quoteId: 'id2',
    asset: 'thirdAsset',
    applicationAmount: 100,
    quoteOptions: [
      {
        monthlyAmount: 0,
        term: '12M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
    ],
    quoteExpiryDate: '2021-08-02T19:23:28.744Z',
    leaseType: 'stretch',
  },
];

export default mockQuoteListResponse;
