import axios from 'axios';
import { SALESFORCE_API_URL, BEARER_TOKEN } from '../config';
import {
  CreateApplication,
  CreateQuote,
  Quote,
  Portfolio,
  Profile,
  CreateProfile,
  AddQuote,
} from './types';

axios.defaults.headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

const wrapPayload = (payload: any) => ({ data: payload });
export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/credit_apps`, wrapPayload(payload));
    } catch (error) {
      throw error;
    }
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    try {
      const response = await axios.post<Quote>(
        `${SALESFORCE_API_URL}/quotes`,
        wrapPayload(payload),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getQuote(quoteId: string): Promise<Quote> {
    try {
      const response = await axios.get<Quote>(`${SALESFORCE_API_URL}/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(portalId: string): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${SALESFORCE_API_URL}/profiles/${portalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    try {
      const response = await axios.post<Profile>(`${SALESFORCE_API_URL}/profiles`, wrapPayload(payload));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/profiles/${portalId}/add_quote`, wrapPayload(payload));
    } catch (error) {
      throw error;
    }
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/profiles/${portalId}/quotes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/profiles/${portalId}/customer_quotes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/portfolios/${portalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/portfolios/${portalId}/customer_portfolios`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
