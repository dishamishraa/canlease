import axios from 'axios';
import i18next from 'i18next';
import { ServiceErrorResponse, ApiError } from '../../lib/api/types';
import { BFF_URL } from '../../lib/config';

// const GET_USER_ERROR_MESSAGE = i18next.t('error.user.default_get');
const LOGOUT_ERROR = i18next.t('error.logout');

// export const getUser = async (): Promise<User> => {
//   try {
//     const { data } = await axios.get<User | ServiceErrorResponse>(
//       `${BFF_URL}/profile/me`,
//       { withCredentials: true },
//     );
//     return data as User;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       throw new ApiError({
//         code: error.response.status,
//         type: error.response.statusText,
//         message: error.message || GET_USER_ERROR_MESSAGE,
//       });
//     }
//     throw error;
//   }
// };

export const logout = (): void => {
  try {
    const returnUrl = window.location.origin;
    const loginUrl = `${BFF_URL}/auth/login?target_uri=${returnUrl}`;
    const logoutUrl = `${BFF_URL}/auth/logout?target_uri=${loginUrl}`;
    window.location.assign(logoutUrl);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError({
        code: error.response.status,
        type: error.response.statusText,
        message: error.message || LOGOUT_ERROR,
      });
    }
    throw error;
  }
};
