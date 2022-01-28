import { CreditApplication, Lease } from './portfolio/types';
import { UserType } from './profile/types';
import { LeaseType, Quote, QuoteOption } from './quote/types';

// CREATE QUOTE types
export type QuoteFlowType = 'instaQuote' | 'createQuote';

export type CreateQuoteState = {
  fromTab?: ContentTypeTabs;
  quoteUserType?: UserType;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  contactInfo?: ContactInfo;
};

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

export type ViewQuoteType = {
  userType?: UserType;
  quote?: Quote;
  contactInfo: ContactInfo;
};

// AUTH types
export type AfterAuthAction = 'apply_finance_personal' | 'apply_finance_customer' | 'save_quote';

export type AuthState = {
  action?: AfterAuthAction;
  email?: string;
  personalInfo?: PersonalInformation;
  contactInfo?: ContactInformation;
  businessInfo?: BusinessInformation;
};

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  userType: UserType;
};

export type ContactInformation = {
  email: string;
  phone: string;
  // unitNumber: string;
  street: string;
  city: string;
  postalCode: string;
  province: string;
};

export type BusinessInformation = {
  companyName: string;
  operatingName: string;
  businessSector: string;
  businessPhone: string;
  website: string;
};

// CREATE APPLICATION types
export type CreateApplicationState = {
  fromTab?: ContentTypeTabs;
  currentStep: number;
  totalSteps: number;
  quoteDetails?: Quote;
  quoteSelected?: QuoteOption;
  personalInfo?: ApplicationPersonalInfo;
  businessInfo?: ApplicationBusinessInfo;
  assetInfo?: AssetInfo;
  creditCheckConsent?: boolean;
};

export type ApplicationPersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
};

type BaseApplicationBusinessInfo = {
  type: 'customer' | 'vendor';
  businessType: 'Proprietorship' | 'Incorporated';
  sin: string;
  dob: string;
  bankruptcy: boolean;
  bankruptcyDetails: string;
};

export type ApplicationBusinessInfoCustomer = BaseApplicationBusinessInfo & {
  type: 'customer';
};

export type ApplicationBusinessInfoVendor = BaseApplicationBusinessInfo & {
  type: 'vendor';
  companyName: string;
  operatingName: string;
  businessSector: string;
  businessPhone: string;
  website: string;
};

export type ApplicationBusinessInfo =
  | ApplicationBusinessInfoCustomer
  | ApplicationBusinessInfoVendor;

export type AssetInfo = {
  assetCondition: 'New' | 'Used';
  ageOfAsset: number;
  expectedDeliveryDate: string;
};

export type LeaseInfo = {
  application: CreditApplication;
  lease?: Lease;
};

// CONTENT TABLE types
export type ContentType = 'Quote' | 'Application';
export type ContentTypeTabs = 'Customer' | 'Personal';
export type ContentFilter =
  | 'all'
  | 'active'
  | 'applied'
  | 'expiring'
  | 'expired'
  | 'under_review'
  | 'financed'
  | 'rejected'
  | 'not_active'
  | 'approved'
  | 'declined';

export type DateType = 'past' | 'future'
