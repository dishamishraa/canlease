import { Lease } from "./portfolio/types";
import { UserType } from "./profile/types";
import { LeaseType, Quote } from "./quote/types";

export type CreateQuoteState = {
  quoteUserType?: UserType;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  contactInfo?: ContactInfo;
}

export type AfterAuthAction = 'apply_finance' | 'save_quote';

export type AuthState = {
  action?: AfterAuthAction;
  email?: string;
  personalInfo?: PersonalInformation;
  contactInfo?: ContactInformation;
  businessInfo?: BusinessInformation;
}

export type QuoteFlowType = 'instaQuote' | 'createQuote';

export type ViewQuoteType = {
  userType?: UserType;
  quote?: Quote;
}

export type EquipmentLeaseInfo = {
  name: string;
  cost: string;
  leaseType: LeaseType;
};

type BaseInfo = {
  type: 'customer' | 'vendor';
  customerName: string;
  customerEmail: string;
  customerCompanyName: string;
};

export type ContactInfoCustomer = BaseInfo & {
  type: 'customer';
};

export type ContactInfoVendor = BaseInfo & {
  type: 'vendor';
  vendorName: string;
  businessEmail: string;
  companyName: string;
};

export type ContactInfo = ContactInfoCustomer | ContactInfoVendor;

export type AssetInfo = {
  assetCondition: string;
  ageOfAsset: number;
  expectedDeliveryDate: string;
}

export type BusinessType = {
  businessType: string;
  sin: string;
  dob: string;
  bankruptcy: string;
  bankruptcyDetails: string;
}

export type DefaultQuoteOption = {
  monthlyAmount: number;
  term: string;
  financeRate: number;
  purchaseOptionDate: string;
};

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  userType: UserType;
};

export type ContactInformation = {
  email: string;
  phone: string;
  unitNumber: string;
  street: string;
  city: string;
  postalCode: string;
  province: string;
};

export type BusinessInformation = {
  companyName: string;
  operatingName: string;
  businessSector: string;
  operatingSinceDate: string;
  businessPhone: string;
  website: string;
};

export type LeaseInfo = {
  company: string;
  contactName: string;
  asset: string;
  vendor: string;
  lease: Lease;
}

export const TermDisplay = {
  '12M': 12,
  '24M': 24,
  '36M': 36,
  '48M': 48,
  '60M': 60,
  '72M': 72,
};

export type ContentType = 'Quote' | 'Application';
export type ContentTypeTabs = 'Customer' | 'Personal';
export type ContentFilter = 'all' | 'active' | 'applied' | 'expiring' | 'expired' | 'under_review' | 'financed' | 'rejected' | 'not_active';
