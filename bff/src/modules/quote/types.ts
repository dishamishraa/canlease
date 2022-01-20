import { CreateQuote, Quote, Profile } from '../../lib/salesforce/types';

export type SendQuote = {
  companyName: string;
  submittedBy: string;
  email: string;
  quoteId: string;
};

export interface QuoteControllerContract {
  createQuote(payload: CreateQuote, profile: Profile | undefined): Promise<Quote>;
  getQuote(quoteId: string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
  getProfile(portalID: string): Promise<Profile>;
}

export interface QuoteServiceContract {
  createQuote(payload: CreateQuote): Promise<Quote>;
  getQuote(quoteId: string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
  getProfile(portalID: string): Promise<Profile>;
}
