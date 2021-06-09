import SalesforceApi from './SalesforceApi';
import { CreateQuote, CreateQuoteControllerContract } from './types';

export default class QuoteService implements CreateQuoteControllerContract {
  private createQuoteApi: SalesforceApi;

  constructor(createQuoteApi: SalesforceApi) {
    this.createQuoteApi = createQuoteApi;
  }

  async createQuote(payload: CreateQuote): Promise<void> {
    return this.createQuoteApi.createQuote(payload);
  }
}
