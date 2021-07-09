export type Quote = {
  quoteId: string;
  asset: string;
  applicationAmount: number;
  quoteOptions: QuoteOption[];
  quoteExpiryDate: string;
  leaseType: string;
};

export type QuoteOption = {
  monthlyAmount: number;
  term: '12M' | '24M' | '36M' | '48M' | '60M' | '72M';
  financeRate: number;
  purchaseOptionDate: string;
};

export type CreateCustomerQuotePayload = {
  userType: string;
  asset: string;
  applicationAmount: number;
  leaseType: string;
  contactName: string;
  contactEmail: string;
  contactBusinessName: string;
};

export type CreateVendorQuotePayload = CreateCustomerQuotePayload & {
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
};

export type CreateQuotePayload = CreateVendorQuotePayload | CreateCustomerQuotePayload;
