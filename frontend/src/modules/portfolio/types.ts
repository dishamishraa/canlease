export type Portfolio = {
  createApps: CreditApplication[];
  leases: Lease[];
};

export type CreditApplication = {
  creditAppNumber: string;
  createdDate: string;
  applicationAmount: number;
  description: string;
  creditStatus: string;
  applicationStatus: 'under review' | 'financed' | 'rejected' | 'not active';
  quoteId: string;
  asset: string;
  name: string;
  companyName: string;
};

export type Lease = {
  leaseNumber: string;
  leaseStartDate: string;
  leaseEndDate: string;
  fullTerm: number;
  vendorName: string;
  vendorInvoice: number;
  assets: string;
  paymentBeforeTax: number;
  purchaseOptionDate: string;
  optionAmount: number;
  quoteId: string;
};
