import sendgridMail, { MailDataRequired } from '@sendgrid/mail';
import axios, { AxiosError } from 'axios';
import {
  SENDGRID_API_URL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_QUOTE_TEMPLATE_ID,
} from '../../lib/config';
import { InternalServerError } from '../../lib/errors';
import { SendQuote } from './types';

export default class SendGridApi {
  constructor() {
    sendgridMail.setApiKey(SENDGRID_API_KEY);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    const { email, actionUrl } = payload;
    try {
      const data: MailDataRequired = {
        to: email,
        from: SENDGRID_FROM_EMAIL,
        dynamicTemplateData: {
          action_url: actionUrl,
        },
        templateId: SENDGRID_QUOTE_TEMPLATE_ID,
      };
      await sendgridMail.send(data);
    } catch (error) {
      throw InternalServerError('Unable to send quote email');
    }
  }
}
