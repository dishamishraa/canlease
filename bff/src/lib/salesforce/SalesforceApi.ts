import axios from 'axios';
import { SALESFORCE_API_URL } from '../config';
import mockPortfolio from './fixtures/mockPortfolio';
import mockProfile from './fixtures/mockProfile';
import mockQuote from './fixtures/mockQuote';
import mockQuoteList from './fixtures/mockQuoteList';
import {
  CreateApplication,
  CreateQuote,
  Quote,
  Portfolio,
  Profile,
  CreateProfile,
  AddQuote,
} from './types';

export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/v2/credit_apps`, payload);
    } catch (error) {
      // throw new Error('');
    }
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    try {
      const response = await axios.post<Quote>(
        `${SALESFORCE_API_URL}/v2/quotes`,
        payload,
      );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return {
        ...mockQuote,
        leaseType: payload.leaseType,
      };
    }
  }

  async getQuote(quoteId: string): Promise<Quote> {
    try {
      const response = await axios.get<Quote>(`${SALESFORCE_API_URL}/v2/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuote;
    }
  }

  async getProfile(portalId: string): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${SALESFORCE_API_URL}/v2/profile/${portalId}`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockProfile;
    }
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    try {
      const response = await axios.post<Profile>(`${SALESFORCE_API_URL}/v2/profile`, payload);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockProfile;
    }
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/add_quote`, payload);
    } catch (error) {
      // throw new Error('');
    }
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/quote`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuoteList;
    }
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/customer_quote`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuoteList;
    }
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockPortfolio;
    }
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}/customer_portfolio`);
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockPortfolio;
    }
  }
}
