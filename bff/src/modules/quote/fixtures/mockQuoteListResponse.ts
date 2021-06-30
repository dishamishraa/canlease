import { Quote } from '../types';

const mockQuoteListResponse: Quote[] = [
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
        }
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
            purchaseOptionDate: '2021-06-14T19:23:28.744Z',
            }
        ],
        quoteExpiryDate: '2021-08-22T19:23:28.744Z',
        leaseType: 'stretch',
    }
]

export default mockQuoteListResponse;
