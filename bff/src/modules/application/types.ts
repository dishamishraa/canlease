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
  leasePortalId: string,
  operatingName: string,
  businessName: string,
  businessType: BusinessType,
  yearsInBusiness: number,
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  contactWebsite: string,
  street: string,
  city: string,
  province: string,
  postalCode: string,
  term: TermType,
  applicationAmount: number,
  asset: string,
  condition: ConditionType,
  ageOfAsset: number,
  businessOwnerName: string,
  businessOwnerStreet: string,
  businessOwnerCity: string,
  bankruptcy: boolean,
  creditCheckConsent: boolean,
  sin: string,
  dob: string,
  vendorPortalId: string,
  quoteId: string,
  expectedDeliveryDate: string,
  bankruptcyDetails: string
};

export interface ApplicationControllerContract {
  createApplication(payload: CreateApplication): Promise<void>;
}

export interface ApplicationServiceContract {
  createApplication(payload: CreateApplication): Promise<void>;
}
