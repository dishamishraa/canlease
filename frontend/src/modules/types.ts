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

export type Portfolio = {
  createApps: CreditApplication[];
  leases: Lease[];
}

export type CreditApplication = {
  creditAppNumber: string;
  createdDate: string;
  applicationAmount: number;
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

export type UserType = 'customer' | 'vendor' | 'rep';

export type Profile = {
  name: string;
  firstname: string;
  lastname: string;
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
  operationName: string;
  businessSector: string;
  businessPhone: string;
};

export type CreateProfilePayload = {
  companyName: string,
  street: string;
  province: string;
  postalCode: string;
  country: string;
  firstName: string;
  lastName: string;
  portalId: string;
  userType: string;
  email: string;
  phone: string;
  title?: string;
  operatingName: string;
  operatingSinceDate: string;
  businessSector: string;
  businessPhone: string;
  website?: string;
}

export type CreateQuotePayload = CreateVendorQuotePayload | CreateCustomerQuotePayload;

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

export type EquipmentLeaseInfo = {
  name: string;
  cost: string;
  leaseType: string;
};

export type ContactInfoVendor = ContactInfoCustomer & {
  vendorName: string;
  businessEmail: string;
  companyName: string;
};

export type ContactInfoCustomer = {
  customerName: string;
  customerEmail: string;
  customerCompanyName: string;
};

export type ContactInfo = ContactInfoVendor | ContactInfoCustomer;

// Identity Accounts
export type AccountRequest = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  enabled: boolean;
};

export type Account = {
  id: number;
  uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
};

export type AccountTokenResponse = {
  id: string;
  uuid: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type UpdatePasswordPayload = {
  id: string | number;
  password: string;
}

export type UpdateNamePayload = {
  id: string;
  firstName: string;
  lastName: string;
}
