import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { CreateAccountPayload } from '../types';


export const createIdentityAccount = async (payload: CreateAccountPayload): Promise<any> => {
    try {
      const { data } = await axios.post(`${getServerUrl}/accounts`, payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };