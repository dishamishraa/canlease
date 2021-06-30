import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { Quote } from '../quote/types';
import {
  Profile, CreateProfile, AddQuote, ProfileServiceContract,
} from './types';

export default class ProfileService implements ProfileServiceContract {
  private api: SalesforceApi;

  constructor(api: SalesforceApi) {
    this.api = api;
  }

  async getProfile(portalId: string): Promise<Profile> {
    return this.api.getProfile(portalId);
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    return this.api.createProfile(payload);
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    return this.api.addQuoteToProfile(portalId, payload);
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.api.getAllQuotesFromProfile(portalId);
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.api.getAllCustomerQuotesFromProfile(portalId);
  }
}
