import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, CreateQuotePayload } from '../types';

export const createQuote = async (payload: CreateQuotePayload): Promise<Quote> => {
  try {
    const { data } = await axios.post<Quote>(`${getServerUrl()}/quote`, payload, { withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
};

// For view quote
export const getQuote = async (quoteId: number | string): Promise<Quote> => {
  try {
    const { data } = await axios.get<Quote>(`${getServerUrl()}/quote/${quoteId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
};

