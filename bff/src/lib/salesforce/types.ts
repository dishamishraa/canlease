export const VALID_USER_TYPES = [
  'customer',
  'vendor',
  'rep',
  'admin',
] as const;
export type UserType = typeof VALID_USER_TYPES[number];

export const VALID_BUSINESS_TYPES = [
  'corporation',
  'sole proprietorship',
] as const;
export type BusinessType = typeof VALID_BUSINESS_TYPES[number];

export const VALID_CONDITION_TYPES = [
  'used',
  'new',
] as const;
export type ConditionType = typeof VALID_CONDITION_TYPES[number];

export const VALID_TERM_TYPES = [
  '12M',
  '24M',
  '36M',
  '48M',
  '60M',
  '72M',
] as const;
export type TermType = typeof VALID_TERM_TYPES[number];

export type CreateApplication = {
  leasePortalId: string;
  operatingName: string;
  businessName: string;
  businessType: BusinessType;
  yearsInBusiness: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  term: TermType;
  applicationAmount: number;
  asset: string;
  condition: ConditionType;
  ageOfAsset: number;
  businessOwnerName: string;
  businessOwnerStreet: string;
  businessOwnerCity: string;
  bankruptcy: boolean;
  creditCheckConsent: boolean;
  sin: string;
  dob: string;
  vendorPortalId: string;
  quoteId: string;
  expectedDeliveryDate: string;
  bankruptcyDetails: string;
};

export type CreateQuote = CreateQuoteCustomer | CreateQuoteVendor;

export type CreateQuoteCustomer = {
  userType: UserType;
  asset: string;
  applicationAmount: number;
  leaseType: LeaseType;
  contactName: string;
  contactEmail: string;
  contactBusinessName: string;
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
  quoteOptions: QuoteOption[];
  rateCardType?: string;
};

export type CreateQuoteVendor = CreateQuoteCustomer & {
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
};

export const isCreateQuoteCustomer = (payload: CreateQuote): 
  payload is CreateQuoteCustomer => (!payload.vendorName);

export const isCreateQuoteVendor = (payload: CreateQuote): 
  payload is CreateQuoteVendor => (!!payload.vendorName);

export type QuoteOption = {
  monthlyAmount: number;
  term: string;
  financeRate: number;
  purchaseOptionDate: string;
};

export const VALID_LEASE_TYPES = [
  'stretch', '$10',
] as const;
export type LeaseType = typeof VALID_LEASE_TYPES[number];

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

export type Application = {
  creditAppNumber: string;
  createdDate: string;
  applicationAmount: number;
  description: string;
  creditStatus: string;
  applicationStatus: string;
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

export type Portfolio = {
  createApps: Application[];
  leases: Lease[];
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  title: string;
  address: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  website: string;
  rateCard: string;
  feePercentage: number;
  theCompanyId: string;
  portalId: string;
  rateCardId: string;
  userType: UserType;
  operatingName: string;
  operatingSinceDate: string;
  businessSector: string;
  businessPhone: string;
};

export type CreateProfile = {
  companyName: string;
  street: string;
  province: string;
  postalCode: string;
  country: string;
  firstName: string;
  lastName: string;
  portalId: string;
  userType: UserType;
  email: string;
  phone: string;
  title: string;
  operatingName: string;
  operatingSinceDate: string;
  businessSector: string;
  businessPhone: string;
  website: string;
};

export type AddQuote = {
  quoteId: string;
  portalId: string;
};
