import axios from 'axios';
import { SALESFORCE_API_URL } from '../config';

import { CreateApplication } from '../../modules/application/types';

import { quoteResponseData } from '../../modules/quote/fixtures';
import { CreateQuote, Quote } from '../../modules/quote/types';
import { AddQuote, CreateProfile, Profile } from '../../modules/profile/types';

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

  async getQuote(quoteId: number | string): Promise<Quote> {
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

  async getProfile(portalId: number | string): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${SALESFORCE_API_URL}/v2/profile/${portalId}`,
      { withCredentials: true });
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
      const response = await axios.post<Profile>(`${SALESFORCE_API_URL}/v2/profile`, payload,
      { withCredentials: true });
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async addQuoteToProfile(portalId: number | string, payload: AddQuote): Promise<void> {
    try {
      await axios.post<void>(
        `${SALESFORCE_API_URL}/v2/profile/${portalId}/add_quote`, payload,
        { withCredentials: true });
    } catch (error) {
      throw error.message;
    }
  }

  async getAllQuotesFromProfile(portalId: number | string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/quote`,
      { withCredentials: true });
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }

  async getAllCustomerQuotesFromProfile(portalId: number | string): Promise<Quote[]> {
    try {
      const response = await axios.get<Quote[]>(`${SALESFORCE_API_URL}/v2/profile/${portalId}/customer_quote`,
      { withCredentials: true });
      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      return message;
    }
  }
}
