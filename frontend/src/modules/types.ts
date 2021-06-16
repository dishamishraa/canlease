export type User = {
  id: number;
  uuid: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
};

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

export type CreditApplication = {
  creditAppNumber: string;
  createdDate: string;
  applcicationAmount: number;
  description: string;
  creditStatus: string;
  applicationStatus: string;
  quoteId: string;
  asset: string;
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

export type CreateQuotePayload = CreateVendorQuotePayload | CreateCustomerQuotePayload;

export type CreateCustomerQuotePayload = {
  userType: string;
  asset: string;
  applicationAmount: number;
  leaseType: string;
  contactName: string;
  contactEmail: string;
  contactBusinessName: string;
  quoteOptions: QuoteOption[];
};

export type CreateVendorQuotePayload = CreateCustomerQuotePayload & {
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
};

export type EquipmentLeaseInfo = {
  name: string;
  cost: string;
  leaseType: string;
}

export type ContactInfoVendor = ContactInfoCustomer & {
  vendorName: string;
  businessEmail: string;
  companyName: string;
}

export type ContactInfoCustomer = {
  customerName: string;
  customerEmail: string;
  customerCompanyName: string;
}

export type ContactInfo = ContactInfoVendor | ContactInfoCustomer;