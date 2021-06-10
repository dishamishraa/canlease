import SalesforceApi from './SalesforceApi';
import SendGridApi from './SendGridApi';
import { CreateQuote, SendQuote, QuoteServiceContract } from './types';

export default class QuoteService implements QuoteServiceContract {
  private createQuoteApi: SalesforceApi;
  private sendGridApi: SendGridApi;

  constructor(createQuoteApi: SalesforceApi, sendGridApi: SendGridApi) {
    this.createQuoteApi = createQuoteApi;
    this.sendGridApi = sendGridApi;
  }

  async createQuote(payload: CreateQuote): Promise<void> {
    return this.createQuoteApi.createQuote(payload);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    return this.sendGridApi.sendQuote(payload);
  }
}
