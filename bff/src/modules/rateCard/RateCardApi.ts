import axios from "axios";
import { DATA_URL } from "../../lib/config";
import { CreateRate, CreateRateCard, Rate, RateCard, UpdateRate, UpdateRateCard } from "./types";

export default class RateCardApi {
    async createRateCard(payload: CreateRateCard): Promise<RateCard> {
        try {
            const response = await axios.post<RateCard>(`${DATA_URL}/rate_cards`, payload);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async getRateCard(id: number): Promise<RateCard> {
        try {
            const response = await axios.get<RateCard>(`${DATA_URL}/rate_cards/${id}`);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async getRateCards(): Promise<RateCard[]> {
        try {
            const response = await axios.get<RateCard[]>(`${DATA_URL}/rate_cards`);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async updateRateCard(id: number, payload: UpdateRateCard): Promise<RateCard> {
        try {
            const response = await axios.patch<RateCard>(`${DATA_URL}/rate_cards/${id}`, payload);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async deleteRateCard(id: number): Promise<void> {
        try {
            await axios.delete<void>(`${DATA_URL}/rate_cards/${id}`);
        } catch (error) {
            throw new Error();
        }
    }

    async createRate(payload: CreateRate): Promise<Rate> {
        try {
            const response = await axios.post<Rate>(`${DATA_URL}/rates`, payload);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async getRates(rateCardId?: number): Promise<Rate[]> {
        try {
            const response = await axios.get<Rate[]>(`${DATA_URL}/rates?ratecardid=${rateCardId}`);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async updateRate(id: number, payload: UpdateRate): Promise<Rate> {
        try {
            const response = await axios.patch<Rate>(`${DATA_URL}/rates/${id}`, payload);
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }
    async deleteRate(id: number): Promise<void> {
        try {
            await axios.delete<void>(`${DATA_URL}/rates/${id}`);
        } catch (error) {
            throw new Error();
        }
    }
}