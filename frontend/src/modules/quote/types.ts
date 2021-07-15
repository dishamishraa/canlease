import { UserType } from "../profile/types";

export type LeaseType = 'stretch' | '$10';

export type Quote = {
  quoteId: string;
  asset: string;
  applicationAmount: number;
  name: string;
  companyName: string;
  quoteOptions: QuoteOption[];
  quoteExpiryDate: string;
  leaseType: LeaseType;
};

export type QuoteOption = {
  monthlyAmount: number;
  term: '12M' | '24M' | '36M' | '48M' | '60M' | '72M';
  financeRate: number;
  purchaseOptionDate: string;
};

export type CreateCustomerQuotePayload = {
  userType: UserType;
  asset: string;
  applicationAmount: number;
  leaseType: LeaseType;
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

export type SendQuote = {
  companyName: string;
  submittedBy: string;
  email: string;
  quoteId: string;
};
