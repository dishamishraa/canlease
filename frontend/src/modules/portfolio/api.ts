import axios from 'axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { Portfolio } from './types';

export const getUserPortfolio = async (portalId: string): Promise<Portfolio> => {
  try {
    const { data } = await axios.get<Portfolio>(`${BFF_URL}/portfolio/${portalId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message,
      });
    }
    throw error;
  }
};

export const getCustomerPortfolio = async (portalId: string): Promise<Portfolio> => {
  try {
    const { data } = await axios.get<Portfolio>(`${BFF_URL}/portfolio/${portalId}/customer_portfolio`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message,
      });
    }
    throw error;
  }
};
