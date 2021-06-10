import axios, { AxiosError } from 'axios';
import { 
    SENDGRID_API_URL,
    SENDGRID_API_KEY,
    SENDGRID_FROM_EMAIL,
 } from '../../lib/config';

 import { SendQuote } from './types';


export default class SendGridApi {
    async sendQuote(payload: SendQuote): Promise<void> {
      try {
        await axios.post(
          `${SENDGRID_API_URL}/v3/mail/send/${SENDGRID_API_KEY}`,
          {
            properties: {
                from:  SENDGRID_FROM_EMAIL,
                template_id: payload.template_id,
                personalizations: payload.personalizations,
            },
          },
        );
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.errorMessage
          : error.message;
        throw new Error(message);
      }
    }
  }
  