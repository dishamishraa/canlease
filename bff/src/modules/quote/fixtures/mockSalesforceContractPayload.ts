import { CreateQuote } from '../types';

const payload: CreateQuote = {
  userType: 'customer',
  asset: 'asset',
  applicationAmount: 0,
  leaseType: 'leaseType',
  contactName: 'contactName',
  contactEmail: 'contact@email.com',
  contactBusinessName: 'contactBusinessName',
  vendorName: 'vendorName',
  vendorEmail: 'vendor@email.com',
  vendorBusinessName: 'vendorBusinessName',
  quoteOptions: [
    {
      monthlyAmount: 0,
      term: 'term',
      financeRate: 0,
      purchaseOptionDate: 'purchaseOptionDate',
    },
  ],
};

export default payload;
