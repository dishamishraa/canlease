import axios from 'axios';
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import {
  AccountTokenResponse, AccountRequest, SignInPayload, UpdatePasswordPayload, UpdateNamePayload,
} from '../types';

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

export const resendVerifyAccount = async (email: string): Promise<void> => {
  try {
    await axios.post(`${getServerUrl}/actions/resendVerifyEmail`, {
      params: {
        email,
      },
    });
  } catch (error) {
  }
};

export const signIn = async (payload: SignInPayload): Promise<AccountTokenResponse> => {
  try {
    const { data } = await axios.post<AccountTokenResponse>(`${getServerUrl}/token`, payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await axios.post(`${getServerUrl}/actions/forgotPassword`, {
      params: {
        email,
      },
    });
  } catch (error) {
  }
};

export const updatePassword = async (payload: UpdatePasswordPayload): Promise<void> => {
  try{
    const { id, password} = payload;
    await axios.post(`${getServerUrl}/${id}/actions/updatePassword`, {
      password
    },
    { withCredentials: true },);
  }catch (error) {
  }
}

export const updateName = async (payload: UpdateNamePayload): Promise<void> => {
  try{
    const { id, firstName, lastName } = payload;
    await axios.post(`${getServerUrl}/accounts/${id}`, {
      firstName,
      lastName
    },
    { withCredentials: true },);
  }catch (error) {
  }
}
