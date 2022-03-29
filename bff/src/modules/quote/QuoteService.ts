import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { CreateQuote, Quote, Profile } from '../../lib/salesforce/types';
import CommunicationApi from './CommunicationApi';
import { QuoteServiceContract, SendQuote } from './types';

export default class QuoteService implements QuoteServiceContract {
  private salesforceApi: SalesforceApi;

  private communicationApi: CommunicationApi;

  constructor(salesforceApi: SalesforceApi, communicationApi: CommunicationApi) {
    this.salesforceApi = salesforceApi;
    this.communicationApi = communicationApi;
  }

  createQuote(payload: CreateQuote): Promise<Quote> {
    return this.salesforceApi.createQuote(payload);
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.salesforceApi.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.communicationApi.sendQuote(payload);
  }

  getProfile(portalId: string): Promise<Profile> {
    return this.salesforceApi.getProfile(portalId);
  }
}
