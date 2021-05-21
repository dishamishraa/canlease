import axios from 'axios';
import i18next from 'i18next';
import { ServiceErrorResponse, ApiError } from '../../lib/api/types';
import { getServerUrl } from '../../lib/utils';
import { User } from '../types';

const GET_USER_ERROR_MESSAGE = i18next.t('error.user.default_get');
const LOGOUT_ERROR = i18next.t('error.logout');

export const getUser = async (): Promise<User> => {
  try {
    const { data } = await axios.get<User | ServiceErrorResponse>(
      `${getServerUrl()}/users/me`,
      { withCredentials: true },
    );
    return data as User;
  } catch (error) {
    if(axios.isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message || GET_USER_ERROR_MESSAGE,
      });
    } 
    throw error;
  }
};

export const redirectToLogin = (options?: { readonly returnUrl: string }): void => {

  let returnUrl: string = options?.returnUrl ?? window.location.href;

  // Check if URL is relative
  if (returnUrl.startsWith('/')) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
    returnUrl = `${window.location.origin}${returnUrl}`;
  }

  window.location.assign(`${getServerUrl()}/auth/login?target_uri=${returnUrl}`);
};

export const logout = async (): Promise<void> => {
  try {
    const returnUrl = window.location.origin;
    const loginUrl = `${getServerUrl()}/auth/login?target_uri=${returnUrl}`;
    const logoutUrl = `${getServerUrl()}/auth/logout?target_uri=${loginUrl}`;
    window.location.assign(logoutUrl);
  } catch (error) {
    if(axios.isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message || LOGOUT_ERROR,
      });
    } 
    throw error;
  }
}
