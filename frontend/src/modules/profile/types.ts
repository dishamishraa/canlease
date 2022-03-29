export type UserType = 'customer' | 'vendor' | 'rep' | 'admin';

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
  businessPhone: string;
};

export type CreateProfilePayload = {
  email: string;
  portalId: string;

  userType: UserType;
  firstName: string;
  lastName: string;

  companyName: string;
  street: string;
  province: string;
  postalCode: string;
  country: string;

  phone: string;
  title: string;
  operatingName: string;
  businessPhone: string;
  website: string;
};

export type UpdateProfilePayload = {
  userType?: string;
  firstName?: string;
  lastName?: string;

  companyName?: string;
  street?: string;
  province?: string;
  postalCode?: string;
  country?: string;

  phone?: string;
  title?: string;
  operatingName?: string;
  businessPhone?: string;
  website?: string;
};

export type AddQuotePaylod = {
  quoteId: string;
};
