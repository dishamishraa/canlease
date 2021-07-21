import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import {
  RateCard
} from './types';

export const getRateCards = async (): Promise<RateCard[]> => {
  try {
    const { data } = await axios.get<RateCard[]>(`${BFF_URL}/rate_cards/`);
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
