import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { Profile, CreateProfile, Quote } from '../../lib/salesforce/types';
import { ProfileServiceContract } from './types';

export default class ProfileService implements ProfileServiceContract {
  private salesforceApi: SalesforceApi;

  constructor(salesforceApi: SalesforceApi) {
    this.salesforceApi = salesforceApi;
  }

  getProfile(portalId: string): Promise<Profile> {
    return this.salesforceApi.getProfile(portalId);
  }

  createProfile(payload: CreateProfile): Promise<Profile> {
    return this.salesforceApi.createProfile(payload);
  }

  addQuoteToProfile(portalId: string, quoteId: string): Promise<void> {
    return this.salesforceApi.addQuoteToProfile(portalId, {
      portalId, quoteId,
    });
  }

  getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.salesforceApi.getAllQuotesFromProfile(portalId);
  }

  getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.salesforceApi.getAllCustomerQuotesFromProfile(portalId);
  }
}
