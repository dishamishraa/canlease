export type CreateApplicationPayload = {
  lesseePortalId?: string;
  operatingName: string;
  businessName: string;
  businessType: 'Incorporated' | 'Proprietorship';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  term: Term;
  applicationAmount: number;
  asset: string;
  condition: 'New' | 'Used';
  ageOfAsset: number;
  businessOwnerName: string;
  businessOwnerStreet: string;
  businessOwnerCity: string;
  bankruptcy: boolean;
  creditCheckConsent: boolean;
  sin: string;
  dob: string;
  vendorPortalId?: string;
  quoteId: string;
  expectedDeliveryDate: string;
  bankruptcyDetails: string;
};

export type Term = '12M' | '24M' | '36M' | '48M' | '60M' | '72M';
