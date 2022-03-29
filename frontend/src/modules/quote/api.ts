import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { Quote, CreateQuotePayload, SendQuote } from './types';

export const createQuote = async (payload: CreateQuotePayload): Promise<Quote> => {
  try {
    const { data } = await axios.post<Quote>(`${BFF_URL}/quote`, payload, { withCredentials: true });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message,
      });
    }
    throw error;
  }
};

// For view quote
export const getQuote = async (quoteId: string): Promise<Quote> => {
  try {
    const { data } = await axios.get<Quote>(`${BFF_URL}/quote/${quoteId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message,
      });
    }
    throw error;
  }
};

// For send quote
export const sendQuote = async (payload: SendQuote): Promise<void> => {
  try {
    await axios.post(
      `${BFF_URL}/quote/send`,
      payload,
      { withCredentials: true },
    );
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
};
