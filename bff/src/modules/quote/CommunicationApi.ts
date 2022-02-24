import axios from 'axios';
import { InternalServerError } from '../../lib/errors';
import { SendQuote } from './types';
import {
  SPINDL_COMMUNICATION_URL,
  SPINDL_COMMUNICATION_QUOTE_TEMPLATE_SLUG,
  FRONTEND_URL,
  SPINDL_API_TOKEN,
  IDENTITY_SESSION_COOKIE_NAME,
} from '../../lib/config';

const createAuthHeader = (identityToken: string): { headers: any } => ({
  headers: {
    Cookie: `${IDENTITY_SESSION_COOKIE_NAME}=${identityToken}`,
  },
});

export default class CommunicationApi {
  async sendQuote(payload: SendQuote): Promise<void> {
    const {
      email, quoteId, companyName, submittedBy,
    } = payload;
    const templateSlug = SPINDL_COMMUNICATION_QUOTE_TEMPLATE_SLUG || 'sendquote';

    try {
      const templateData = {
        sendTo: email,
        company_name: companyName,
        submitted_by: submittedBy,
        action_url: `${FRONTEND_URL}/instaQuote/${quoteId}`,
        sign_up_link: `${FRONTEND_URL}/account/signUp`,
      };

      const url = `${SPINDL_COMMUNICATION_URL}/schemas/canlease/emailTemplates/${templateSlug}/action/send`;
      const response = await axios.post<void>(`${url}`, templateData, createAuthHeader(SPINDL_API_TOKEN));

      if (response && response.status >= 400) {
        throw InternalServerError();
      }
    } catch (error) {
      throw InternalServerError('Unable to send quote email');
    }
  }
}
