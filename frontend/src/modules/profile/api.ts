import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, CreateQuotePayload, Profile, CreateProfilePayload} from '../types';

export const getProfile = async (id: string): Promise<Profile> => {
    try {
        const { data } = await axios.get<Profile>(`${getServerUrl()}/profile/${id}`, { withCredentials: true });
        return data as Profile;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw error;
        }
        throw error;
      }
}

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
export const createProfile = async (payload: CreateProfilePayload): Promise<Profile> => {
  try {
    const { data } = await axios.post<Profile>(`${getServerUrl()}/profile`, payload, { withCredentials: true });
    return data as Profile;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
}
