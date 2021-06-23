import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import SendGridApi from './SendGridApi';
import {
  CreateQuote, Quote, SendQuote, QuoteServiceContract,
} from './types';

export default class QuoteService implements QuoteServiceContract {
  private createQuoteApi: SalesforceApi;

  private sendGridApi: SendGridApi;

  constructor(createQuoteApi: SalesforceApi, sendGridApi: SendGridApi) {
    this.createQuoteApi = createQuoteApi;
    this.sendGridApi = sendGridApi;
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    return this.createQuoteApi.createQuote(payload);
  }

  async getQuote(quoteId: number | string): Promise<Quote> {
    return this.createQuoteApi.getQuote(quoteId);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    return this.sendGridApi.sendQuote(payload);
  }
}
