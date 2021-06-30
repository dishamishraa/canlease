import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, CreateQuotePayload } from '../types';

export const getAllQuotesFromProfile = async(portalId: string): Promise<Quote[]> => {
    try {
      const { data } = await axios.get<Quote[]>(`${getServerUrl()}/profile/${portalId}/quote`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };
  
  export const getAllCustomerQuotesFromProfile = async(portalId: string): Promise<Quote[]> => {
    try {
      const { data } = await axios.get<Quote[]>(`${getServerUrl()}/profile/${portalId}/customer_quote`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };