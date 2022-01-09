import axios from 'axios';
import { SALESFORCE_API_URL, BEARER_TOKEN } from '../config';
import {
  CreateApplication,
  CreateQuote,
  Quote,
  Portfolio,
  Profile,
  CreateProfile,
  AddQuote,
} from './types';

axios.defaults.headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

const wrapPayload = (payload: any) => ({ data: payload });
type DataResponse<T> = {
  data: T;
};

export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    await axios.post<void>(`${SALESFORCE_API_URL}/credit_apps`, wrapPayload(payload));
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    const response = await axios.post<DataResponse<Quote>>(
      `${SALESFORCE_API_URL}/quotes`,
      wrapPayload(payload),
    );
    return response.data.data;
  }

  async getQuote(quoteId: string): Promise<Quote> {
    const response = await axios.get<DataResponse<Quote>>(`${SALESFORCE_API_URL}/quotes/${quoteId}`);
    return response.data.data;
  }

  async getProfile(portalId: string): Promise<Profile> {
    const response = await axios.get<DataResponse<Profile>>(`${SALESFORCE_API_URL}/profiles/${portalId}`);
    return response.data.data;
  }

  async createProfile(payload: CreateProfile): Promise<Profile> {
    const response = await axios.post<DataResponse<Profile>>(`${SALESFORCE_API_URL}/profiles`, wrapPayload(payload));
    return response.data.data;
  }

  async addQuoteToProfile(portalId: string, payload: AddQuote): Promise<void> {
    await axios.post<void>(`${SALESFORCE_API_URL}/profile/${portalId}/add_quote`, wrapPayload(payload));
  }

  async getAllQuotesFromProfile(portalId: string): Promise<Quote[]> {
    const response = await axios.get<DataResponse<Quote[]>>(`${SALESFORCE_API_URL}/profile/${portalId}/quote`);
    return response.data.data;
  }

  async getAllCustomerQuotesFromProfile(portalId: string): Promise<Quote[]> {
    const response = await axios.get<DataResponse<Quote[]>>(`${SALESFORCE_API_URL}/profile/${portalId}/customer_quote`);
    return response.data.data;
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    const response = await axios.get<DataResponse<Portfolio>>(`${SALESFORCE_API_URL}/portfolios/${portalId}`);
    return response.data.data;
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    const response = await axios.get<DataResponse<Portfolio>>(`${SALESFORCE_API_URL}/portfolios/${portalId}/customer_portfolios`);
    return response.data.data;
  }
}
