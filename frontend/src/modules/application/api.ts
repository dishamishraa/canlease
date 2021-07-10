import axios from 'axios';
import { BFF_URL } from '../../lib/config';
import { CreateApplicationPayload } from './types';

export const createApplication = async (payload: CreateApplicationPayload): Promise<void> => {
    try {
      await axios.post(`${BFF_URL}/credit_apps`, payload, { withCredentials: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };