import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Portfolio } from '../types';

export const getUserPortfolio = async (portalId: string): Promise<Portfolio> => {
    try {
      const { data } = await axios.get<Portfolio>(`${getServerUrl()}/portfolio/${portalId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };

export const getCustomerPortfolio = async (portalId: string): Promise<Portfolio> => {
    try {
      const { data } = await axios.get<Portfolio>(`${getServerUrl()}/portfolio/${portalId}/customer_portfolio`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };