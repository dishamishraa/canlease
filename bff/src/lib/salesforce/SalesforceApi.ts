import axios from 'axios';
import { SALESFORCE_API_URL, BEARER_TOKEN } from '../config';
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

axios.defaults.headers = { Authorization: `Bearer ${BEARER_TOKEN}` }

export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/credit_apps`, payload );
    } catch (error) {
      // throw new Error('');
    }
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    try {
      const response = await axios.post<Quote>(
        `${SALESFORCE_API_URL}/quotes`,
        payload,
      );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return {
        ...mockQuote,
        ...payload,
      };
    }
  }

  async getQuote(quoteId: string): Promise<Quote> {
    try {
      const response = await axios.get<Quote>(`${SALESFORCE_API_URL}/quotes/${quoteId}` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuote;
    }
  }

  async getProfile(portalId: string): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${SALESFORCE_API_URL}/profile/${portalId}` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockProfile;
    }
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    try {
      const response = await axios.post<Profile>(`${SALESFORCE_API_URL}/profile`, payload );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockProfile;
    }
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/profile/${portalId}/add_quote`, payload );
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      throw new Error(message);
    }
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/profile/${portalId}/quote` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuoteList;
    }
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/profile/${portalId}/customer_quote` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockQuoteList;
    }
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/portfolio/${portalId}` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockPortfolio;
    }
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/portfolio/${portalId}/customer_portfolio` );
      return response.data;
    } catch (error) {
      // throw new Error('');
      return mockPortfolio;
    }
  }
}
