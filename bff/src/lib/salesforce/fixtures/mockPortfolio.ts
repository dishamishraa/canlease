import { Portfolio } from '../types';

const mockPortfolio: Portfolio = {
  creditApps: [
    {
      creditAppNumber: 'string',
      createdDate: '2021-06-29T15:17:16.896Z',
      applicationAmount: 0,
      description: 'string',
      creditStatus: 'string',
      applicationStatus: 'string',
      quoteId: 'string',
      asset: 'string',
      name: 'name here',
      companyName: 'cool company',
      creditDecision: 'string',
    },
  ],
  leases: [
    {
      leaseNumber: 'string',
      leaseStartDate: '2021-06-29T15:17:16.896Z',
      leaseEndDate: '2021-06-29T15:17:16.896Z',
      fullTerm: 0,
      vendorName: 'string',
      vendorInvoice: 0,
      assets: 'string',
      paymentBeforeTax: 0,
      purchaseOptionDate: '2021-06-29T15:17:16.896Z',
      optionAmount: 0,
      quoteId: 'string',
    },
  ],
};

export default mockPortfolio;
