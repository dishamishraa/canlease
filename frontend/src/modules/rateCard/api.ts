import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import { CreateRateCard, RateCard, Rate, CreateRate, UpdateRate } from './types';

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

export const getRateCard = async (rateCardId: string): Promise<RateCard> => {
  try {
    const { data } = await axios.get<RateCard>(`${BFF_URL}/rate_cards/${rateCardId}`);
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

export const updateRate = async(rateId: number, payload: UpdateRate): Promise<Rate> => {
  try{
    const { rateId, ...newPayload } = payload
    const { data } = await axios.patch(`${BFF_URL}/rates/${rateId}`, newPayload, { withCredentials: true });
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
