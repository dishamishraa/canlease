import axios, { AxiosError } from 'axios';
import { SALESFORCE_API_URL } from '../../lib/config';

import { CreateQuote } from './types';

export default class SalesforceApi {
  async createQuote(payload: CreateQuote): Promise<void> {
    try {
      await axios.post(
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
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.errorMessage
        : error.message;
      throw new Error(message);
    }
  }
}
