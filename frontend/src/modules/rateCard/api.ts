import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { RateCard, Rate, CreateRate, UpdateRate } from './types';

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

export const getRates = async (rateCardId: string): Promise<Rate[]> => {
  try {
    const { data } = await axios.get<Rate[]>(`${BFF_URL}/rate_cards/${rateCardId}/rates`);
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

export const createRate = async(payload: CreateRate): Promise<Rate> => {
  try{
    const { data } = await axios.post(`${BFF_URL}/rates`, payload, { withCredentials: true });
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

export const updateRate = async(rateId: string, payload: UpdateRate): Promise<Rate> => {
  try{
    const { data } = await axios.patch(`${BFF_URL}/rates/${rateId}`, payload, { withCredentials: true });
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
}

export const deleteRate = async(rateId: string): Promise<void> => {
  try{
    await axios.delete(`${BFF_URL}/rates/${rateId}`, { withCredentials: true });
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
}
