import {
  Profile, CreateProfile, Quote,
} from '../../lib/salesforce/types';
import {
  ProfileControllerContract, ProfileServiceContract,
} from './types';

export default class ProfileController implements ProfileControllerContract {
  private service: ProfileServiceContract;

  constructor(service: ProfileServiceContract) {
    this.service = service;
  }

  getProfile(portalId: string): Promise<Profile> {
    return this.service.getProfile(portalId);
  }

  createProfile(payload: CreateProfile): Promise<Profile> {
    return this.service.createProfile(payload);
  }

  addQuoteToProfile(portalId: string, quoteId: string): Promise<void> {
    return this.service.addQuoteToProfile(portalId, quoteId);
  }

  getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.service.getAllQuotesFromProfile(portalId);
  }

  getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    return this.service.getAllCustomerQuotesFromProfile(portalId);
  }
}
