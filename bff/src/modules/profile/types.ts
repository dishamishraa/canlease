import {
  Profile, CreateProfile, AddQuote, Quote,
} from '../../lib/salesforce/types';

export type IdentityTokenPayload = {
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
};

export interface ProfileControllerContract {
  getProfile(portalId: string): Promise<Profile>;
  createProfile(payload: CreateProfile): Promise<Profile>;
  addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void>;
  getAllQuotesFromProfile(portalId: string): Promise<Quote[]>;
  getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]>;
}

export interface ProfileServiceContract {
  getProfile(portalId: string): Promise<Profile>;
  createProfile(payload: CreateProfile): Promise<Profile>;
  addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void>;
  getAllQuotesFromProfile(portalId: string): Promise<Quote[]>;
  getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]>;
}
