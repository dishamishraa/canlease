import axios from 'axios';
import { SALESFORCE_API_URL } from '../config';

import { CreateApplication } from '../../modules/application/types';

import { quoteResponseData } from '../../modules/quote/fixtures';
import { CreateQuote, Quote } from '../../modules/quote/types';
import { Portfolio } from '../../modules/portfolio/types';
import { AddQuote, CreateProfile, Profile } from '../../modules/profile/types';
import { Portfolio } from '../../modules/portfolio/types';

export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    try {
      await axios.post<void>(
        `${SALESFORCE_API_URL}/v2/credit_apps`,
        {
          payload,
        },
      );
    } catch (error) {
      throw error.message;
    }
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    try {
      const response = await axios.post<Quote>(
        `${SALESFORCE_API_URL}/v2/quotes`,
        {
          properties: {
            userType: payload.userType,
            asset: payload.asset,
            applicationAmount: payload.applicationAmount,
            leaseType: payload.leaseType,
            contactName: payload.contactName,
            contactEmail: payload.contactEmail,
            contactBusinessName: payload.contactBusinessName,
            vendorName: payload.vendorName,
            vendorEmail: payload.vendorEmail,
            vendorBusinessName: payload.vendorBusinessName,
            quoteOptions: payload.quoteOptions,
          },
        },
      );
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return quoteResponseData;
    }
  }

  async getQuote(quoteId: string): Promise<Quote> {
    try {
      const response = await axios.get<Quote>(`${SALESFORCE_API_URL}/v2/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}/customer_portfolio`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getProfile(portalId: string): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${SALESFORCE_API_URL}/v2/profile/${portalId}`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    try {
      const response = await axios.post<Profile>(`${SALESFORCE_API_URL}/v2/profile`, payload);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    try {
      await axios.post<void>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/add_quote`, payload);
    } catch (error) {
      throw error.message;
    }
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/quote`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/customer_quote`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }
  
  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    try {
      const response = await axios.get<Portfolio>(`${SALESFORCE_API_URL}/v2/portfolio/${portalId}/customer_portfolio`);
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }
}
