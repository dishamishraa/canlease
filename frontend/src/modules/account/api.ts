import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { AccountTokenResponse, AccountRequest, SignInPayload, Account, Profile } from '../types';

export const createIdentityAccount = async (payload: AccountRequest): Promise<AccountTokenResponse> => {
    try {
      const { data } = await axios.post<AccountTokenResponse>(`${getServerUrl}/accounts`, payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw error;
    }
  };

export const resendVerifyAccount = async(email: string): Promise<AccountTokenResponse> => {
  try{
    const { data } = await axios.post<AccountTokenResponse>(`${getServerUrl}/actions/resendVerifyEmail/${email}`, );
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