import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { Quote } from '../quote/types';
import { Profile, CreateProfilePayload, AddQuotePaylod } from './types';

export const createProfile = async (payload: CreateProfilePayload): Promise<Profile> => {
  try {
    const { data } = await axios.post<Profile>(`${BFF_URL}/profile`, payload, {
      withCredentials: true,
    });
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

export const getProfile = async (): Promise<Profile> => {
  try {
    const { data } = await axios.get<Profile>(`${BFF_URL}/profile/me`, { withCredentials: true });
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

export const getQuotes = async (portalId: string): Promise<Quote[]> => {
  try {
    const { data } = await axios.get<Quote[]>(`${BFF_URL}/profile/${portalId}/quote`);
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

export const getCustomerQuotes = async (portalId: string): Promise<Quote[]> => {
  try {
    const { data } = await axios.get<Quote[]>(`${BFF_URL}/profile/${portalId}/customer_quote`);
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

export const addQuoteToProfile = async (
  portalId: string,
  payload: AddQuotePaylod,
): Promise<void> => {
  try {
    await axios.post(
      `${BFF_URL}/profile/${portalId}/actions/add_quote`,
      payload,
      { withCredentials: true },
    );
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
