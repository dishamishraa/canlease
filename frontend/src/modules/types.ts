export type User = {
  id: number;
  uuid: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
};

//temporary proposed data models
export type Quote = {
  quoteId: string;
  asset: string;
  applicationAmount: number;
  quoteOptions: QuoteOption[];
  quoteExpiryDate: string;
}

export type QuoteOption = {
  monthlyAmount: number;
  term: '12M' | '24M' | '36M' | '48M' | '60M' | '72M'
  financeRate: number;
  purchaseOptionDate; string;
}

export type CreditApplication = {
  creditAppNumber: string;
  createdDate: string;
  applcicationAmount: number;
  description: string;
  creditStatus: string;
  applicationStatus: string;
  quoteId: string;
  asset: string;
}

export type Lease = {
  leaseNumber: string;
  leaseStartDate: string;
  fullTerm: number;
  vendorName: string;
  vendorInvoice: number;
  assets: string;
  paymentBeforeTax: number;
  purchaseOptionDate: string;
  optionAmount: number;
  leaseEndDate: string;
  quoteId: string;
}