import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { CreateQuote, Quote } from '../../lib/salesforce/types';
import SendGridApi from './SendGridApi';
import {
  QuoteServiceContract, SendQuote,
} from './types';

export default class QuoteService implements QuoteServiceContract {
  private salesforceApi: SalesforceApi;

  private sendGridApi: SendGridApi;

  constructor(salesforceApi: SalesforceApi, sendGridApi: SendGridApi) {
    this.salesforceApi = salesforceApi;
    this.sendGridApi = sendGridApi;
  }

  createQuote(payload: CreateQuote): Promise<Quote> {
    return this.salesforceApi.createQuote(payload);
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.salesforceApi.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.sendGridApi.sendQuote(payload);
  }
}
