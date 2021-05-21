import axios from 'axios';
import { IDENTITY_URL } from '../../lib/config';

export default class AuthApi {
  async exchangeCode(code: string): Promise<{ token: string }> {
    const { data } = await axios.post(
      `${IDENTITY_URL}/token/code`,
      { code },
    );

    return data;
  }
}
