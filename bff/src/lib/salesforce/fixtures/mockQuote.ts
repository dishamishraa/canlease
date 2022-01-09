import { Quote } from '../types';

const mockQuote: Quote = {
  quoteId: 'abc',
  asset: 'Cool Asset',
  applicationAmount: 100,
  name: 'name here',
  companyName: 'cool company',
  quoteOptions: [
    {
      monthlyAmount: 30,
      term: '12M',
      financeRate: 5,
      purchaseOptionDate: '2021-06-14T19:23:28.744Z',
    },
    {
      monthlyAmount: 100,
      term: '24M',
      financeRate: 10,
      purchaseOptionDate: '2021-06-14T19:23:28.744Z',
    },
    {
      monthlyAmount: 200,
      term: '36M',
      financeRate: 2,
      purchaseOptionDate: '2021-06-14T19:23:28.744Z',
    },
    {
      monthlyAmount: 250,
      term: '48M',
      financeRate: 15,
      purchaseOptionDate: '2021-06-14T19:23:28.744Z',
    },
  ],
  quoteExpiryDate: '2021-08-22T19:23:28.744Z',
  leaseType: 'stretch',
};

export default mockQuote;
