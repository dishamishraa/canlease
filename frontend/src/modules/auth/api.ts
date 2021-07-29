import { isAxiosError } from '../../lib/api/axios';
import i18next from 'i18next';
import { ApiError } from '../../lib/api/types';

const LOGOUT_ERROR = i18next.t('error.logout');

export const logout = (): void => {
  try {
    const returnUrl = window.location.origin;
    window.location.assign(`${returnUrl}/account/signIn`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message || LOGOUT_ERROR,
      });
    }
    throw error;
  }
};
