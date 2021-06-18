import axios from 'axios';
import { SALESFORCE_API_URL } from '../../lib/config';
import { quoteResponseData } from './fixtures';

import { CreateQuote, Quote } from './types';

export default class SalesforceApi {
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
}
