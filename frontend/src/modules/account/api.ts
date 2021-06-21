import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { AccountTokenResponse, IdentityAccountPayload, SignInPayload, Account } from '../types';

export const createIdentityAccount = async (payload: IdentityAccountPayload): Promise<Account> => {
    try {
      const { data } = await axios.post<Account>(`${getServerUrl}/accounts`, payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };

export const verifyAccount = async(accountId: number | string, token: string): Promise<AccountTokenResponse> => {
  try{
    const { data } = await axios.post<AccountTokenResponse>(`${getServerUrl}/accounts/${accountId}/actions/verifyAccount`, token);
    return data;
  }catch (error){
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
}

export const signIn = async (payload: SignInPayload): Promise<AccountTokenResponse> => {
  try{
    const { data } = await axios.post<AccountTokenResponse>(`${getServerUrl}/token`, payload);
    return data;
  }catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
}