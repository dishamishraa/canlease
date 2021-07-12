import { Quote } from "../types"

const mockQuote: Quote = {
    quoteId: 'abc',
    asset: 'Cool Asset',
    applicationAmount: 0,
    quoteOptions: [
      {
        monthlyAmount: 0,
        term: '12M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
      {
        monthlyAmount: 0,
        term: '24M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
      {
        monthlyAmount: 0,
        term: '36M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
      {
        monthlyAmount: 0,
        term: '48M',
        financeRate: 0,
        purchaseOptionDate: '2021-06-14T19:23:28.744Z',
      },
    ],
    quoteExpiryDate: '2021-08-22T19:23:28.744Z',
    leaseType: 'stretch',
}
export default mockQuote;
