import axios, { isAxiosError } from '../../lib/api/axios';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';
import {
  AccountResponse, SignInPayload, SignUpPayload, UpdateNamePayload, UpdatePasswordPayload,
} from './types';

export const signUp = async (payload: SignUpPayload): Promise<AccountResponse> => {
  try {
    const { data } = await axios.post<AccountResponse>(`${BFF_URL}/accounts`, payload);
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

export const resendVerifyAccount = async (email: string): Promise<void> => {
  try {
    await axios.post(`${BFF_URL}/accounts/actions/resendVerifyEmail`, {
      params: {
        email,
      },
    });
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

export const signIn = async (payload: SignInPayload): Promise<AccountResponse> => {
  try {
    const { data } = await axios.post<AccountResponse>(`${BFF_URL}/token`, payload);
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

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await axios.post(`${BFF_URL}/accounts/actions/forgotPassword`, {
      params: {
        email,
      },
    });
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

export const updatePassword = async (payload: UpdatePasswordPayload): Promise<void> => {
  try {
    const { id, password } = payload;
    await axios.post(`${BFF_URL}/accounts/${id}/actions/updatePassword`, {
      password,
    },
    { withCredentials: true });
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

export const updateName = async (payload: UpdateNamePayload): Promise<void> => {
  try {
    const { id, firstName, lastName } = payload;
    await axios.patch(`${BFF_URL}/accounts/${id}`, {
      firstName,
      lastName,
    },
    { withCredentials: true });
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
