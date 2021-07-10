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
  operatingSinceDate: string;
  businessSector: string;
  businessPhone: string;
};

export type CreateProfilePayload = {
  email: string;
  portalId: string;

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
  operatingSinceDate?: string;
  businessSector?: string;
  businessPhone?: string;
  website?: string;
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
  operatingSinceDate?: string;
  businessSector?: string;
  businessPhone?: string;
  website?: string;
};
