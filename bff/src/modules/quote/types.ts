import { CreateQuote, Quote } from '../../lib/salesforce/types';

export type SendQuote = {
  email: string;
  quoteId: string;
};
export interface QuoteControllerContract {
  createQuote(payload: CreateQuote): Promise<Quote>;
  getQuote(quoteId: string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
}

export interface QuoteServiceContract {
  createQuote(payload: CreateQuote): Promise<Quote>;
  getQuote(quoteId: string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
}
