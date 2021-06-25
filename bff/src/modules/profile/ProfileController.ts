import { Quote } from '../quote/types';
import { Profile, CreateProfile, AddQuote, ProfileControllerContract, ProfileServiceContract } from './types';

export default class ProfileController implements ProfileControllerContract {
    private service: ProfileServiceContract;
    constructor(service: ProfileServiceContract) {
        this.service = service
    }

    async getProfile(portalId: string | number): Promise<Profile> {
        return this.service.getProfile(portalId);
    }
    
    async createProfile(payload: CreateProfile): Promise<Profile> {
        return this.service.createProfile(payload);
    }

    async addQuoteToProfile(portalId: string | number, payload: AddQuote): Promise<void> {
        return this.service.addQuoteToProfile(portalId, payload);
    }
    
    async getAllQuotesFromProfile(portalId: string | number): Promise<Quote[]> {
        return this.service.getAllQuotesFromProfile(portalId);
    }

    async getAllCustomerQuotesFromProfile(portalId: string | number): Promise<Quote[]> {
        return this.service.getAllCustomerQuotesFromProfile(portalId);
    }
}