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
  rateCardType?: string;
  fee?: number;
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
export type ContentType = 'Quote' | 'Application';
export type ContentTypeTabs = 'Customer' | 'Personal';
export type ContentFilter = 'all' | 'active' | 'applied' | 'expiring' | 'expired' | 'under_review' | 'financed' | 'rejected' | 'not_active';
