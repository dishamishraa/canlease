import { Portfolio } from '../types';

const portfolioResponse: Portfolio = {
    createApps: [
        {
          creditAppNumber: "string",
          createdDate: "2021-06-29T15:17:16.896Z",
          applicationAmount: 0,
          description: "string",
          creditStatus: "string",
          applicationStatus: "string",
          quoteId: "string",
          asset: "string"
        }
    ],
    leases: [
        {
          leaseNumber: "string",
          leaseStartDate: "2021-06-29T15:17:16.896Z",
          leaseEndDate: "2021-06-29T15:17:16.896Z",
          fullTerm: 0,
          vendorName: "string",
          vendorInvoice: 0,
          assets: "string",
          paymentBeforeTax: 0,
          purchaseOptionDate: "2021-06-29T15:17:16.896Z",
          optionAmount: 0,
          quoteId: "string"
        }
    ]
};

export default portfolioResponse;
