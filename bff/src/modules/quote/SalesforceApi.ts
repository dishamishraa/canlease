import axios, { AxiosError } from 'axios';
import {
  SALESFORCE_API_URL,
} from '../../lib/config';

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
      let { message } = error;
      if (error.response) {
        const { response } = error;
        message = response?.data?.message || '';
        if (response?.status === 409) {
          return;
        }
      }
      throw new Error(`Failed to create hubspot contact: ${message}`);
    }
  }
}
