import { Quote, UserType } from '../quote/types';

export type Profile = {
    name: string;
    firstName: string,
    lastName: string,
    companyName: string,
    phone: string,
    email: string,
    title: string,
    address: string,
    street: string,
    city: string,
    province: string,
    postalCode: string,
    country: string,
    website: string,
    rateCard: string,
    feePercentage: number,
    theCompanyId: string,
    portalId: string,
    rateCardId: string,
    userType: UserType,
    operatingName: string,
    operatingSinceDate: string,
    businessSector: string,
    businessPhone: string
  }
  
  export type CreateProfile = {
    companyName: string,
    street: string,
    province: string,
    postalCode: string,
    country: string,
    firstName: string,
    lastName: string,
    portalId: string,
    userType: UserType,
    email: string,
    phone: string,
    title: string,
    operatingName: string,
    operatingSinceDate: string,
    businessSector: string,
    businessPhone: string,
    website: string
  }

  export type AddQuote = {
      quoteId: string;
      portalId: string;
  }

  export interface ProfileControllerContract {
    getProfile(portalId: number | string): Promise<Profile>;
    createProfile(payload: CreateProfile): Promise<Profile>;
    addQuoteToProfile(portalId: number | string, payload: AddQuote): Promise<void>;
    getAllQuotesFromProfile(portalId: number | string): Promise<Quote[]>;
    getAllCustomerQuotesFromProfile(portalId: number | string): Promise<Quote[]>;
  }

  export interface ProfileServiceContract {
    getProfile(portalId: number | string): Promise<Profile>;
    createProfile(payload: CreateProfile): Promise<Profile>;
    addQuoteToProfile(portalId: number | string, payload: AddQuote): Promise<void>;
    getAllQuotesFromProfile(portalId: number | string): Promise<Quote[]>;
    getAllCustomerQuotesFromProfile(portalId: number | string): Promise<Quote[]>;
  }