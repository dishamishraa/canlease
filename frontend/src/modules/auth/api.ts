import { isAxiosError } from '../../lib/api/axios';
import i18next from 'i18next';
import { ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';

const LOGOUT_ERROR = i18next.t('error.logout');

export const logout = (): void => {
  try {
    const returnUrl = window.location.origin;
    const loginUrl = `${BFF_URL}/auth/login?target_uri=${returnUrl}`;
    const logoutUrl = `${BFF_URL}/auth/logout?target_uri=${loginUrl}`;
    window.location.assign(logoutUrl);
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
