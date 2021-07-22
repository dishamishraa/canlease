import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { CreateRateCard, RateCard } from './types';

export const createRateCard = async (payload: CreateRateCard): Promise<RateCard> => {
    try {
        const response = await axios.post<RateCard>(`${BFF_URL}/rate_cards`, payload, { withCredentials: true });
        return response.data;
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

export const getRateCards = async (): Promise<RateCard[]> => {
    try {
      const { data } = await axios.get<RateCard[]>(`${BFF_URL}/rate_cards`);
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

export const deleteRateCard = async (id: number): Promise<void> => {
  try {
    await axios.delete<void>(`${BFF_URL}/rate_cards/${id}`);
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

  