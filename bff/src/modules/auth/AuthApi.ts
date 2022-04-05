import axios from 'axios';
import { IDENTITY_URL } from '../../lib/config';
import { createAuthHeader } from '../../lib/utils';
import { AccountResponse, SignInPayload, SignUpPayload } from './types';

export default class AuthApi {
  async signUp(payload: SignUpPayload): Promise<AccountResponse> {
    const { data } = await axios.post(`${IDENTITY_URL}/accounts`, payload);

    return data;
  }

  async signIn(payload: SignInPayload): Promise<AccountResponse> {
    const { data } = await axios.post(`${IDENTITY_URL}/token`, payload);

    return data;
  }

  async refreshToken(token: string): Promise<AccountResponse> {
    const { data } = await axios.post(
      `${IDENTITY_URL}/token/refresh_token`,
      {},
      createAuthHeader(token),
    );

    return data;
  }

  async exchangeCode(code: string): Promise<{ token: string }> {
    const { data } = await axios.post(`${IDENTITY_URL}/token/code`, { code });

    return data;
  }
}
