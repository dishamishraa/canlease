import axios from 'axios';
import { DATA_URL, IDENTITY_SESSION_COOKIE_NAME } from '../../lib/config';
import {
  CreateRate, CreateRateCard, Rate, RateCard, UpdateRate, UpdateRateCard,
} from './types';

const createAuthHeader = (identityToken: string): { headers: any } => {
  return {
    headers: {
      Cookie: `${IDENTITY_SESSION_COOKIE_NAME}=${identityToken}`,
    }
  }
}
export default class RateCardApi {
  async createRateCard(identityToken: string, payload: CreateRateCard): Promise<RateCard> {
    try {
      const response = await axios.post<RateCard>(
        `${DATA_URL}/rate_cards`, 
        payload,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getRateCard(identityToken: string, id: number): Promise<RateCard> {
    try {
      const response = await axios.get<RateCard>(
        `${DATA_URL}/rate_cards/${id}`,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getRateCards(identityToken: string): Promise<RateCard[]> {
    try {
      const response = await axios.get<RateCard[]>(
        `${DATA_URL}/rate_cards`,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async updateRateCard(identityToken: string, id: number, payload: UpdateRateCard): Promise<RateCard> {
    try {
      const response = await axios.patch<RateCard>(
        `${DATA_URL}/rate_cards/${id}`, 
        payload,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteRateCard(identityToken: string, id: number): Promise<void> {
    try {
      await axios.delete<void>(
        `${DATA_URL}/rate_cards/${id}`,
        createAuthHeader(identityToken),
      );
    } catch (error) {
      throw new Error();
    }
  }

  async createRate(identityToken: string, payload: CreateRate): Promise<Rate> {
    try {
      const response = await axios.post<Rate>(
        `${DATA_URL}/rates`, 
        payload,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getRates(identityToken: string, rateCardId?: number): Promise<Rate[]> {
    try {
      const response = await axios.get<Rate[]>(
        `${DATA_URL}/rates?ratecardid=${rateCardId}`,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async updateRate(identityToken: string, id: number, payload: UpdateRate): Promise<Rate> {
    try {
      const response = await axios.patch<Rate>(
        `${DATA_URL}/rates/${id}`, 
        payload,
        createAuthHeader(identityToken),
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteRate(identityToken: string, id: number): Promise<void> {
    try {
      await axios.delete<void>(
        `${DATA_URL}/rates/${id}`,
        createAuthHeader(identityToken),
      );
    } catch (error) {
      throw new Error();
    }
  }
}
