import sendgridMail, { MailDataRequired } from '@sendgrid/mail';
import {
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_QUOTE_TEMPLATE_ID,
  FRONTEND_URL,
} from '../../lib/config';
import { InternalServerError } from '../../lib/errors';
import { SendQuote } from './types';

export default class SendGridApi {
  constructor() {
    sendgridMail.setApiKey(SENDGRID_API_KEY);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    const { email, quoteId } = payload;
    // TODO implement sendgrid, no api and key
    try {
      const data: MailDataRequired = {
        to: email,
        from: SENDGRID_FROM_EMAIL,
        dynamicTemplateData: {
          action_url: `${FRONTEND_URL}/instaQuote/${quoteId}`,
        },
        templateId: SENDGRID_QUOTE_TEMPLATE_ID,
      };
      await sendgridMail.send(data);
    } catch {
      throw InternalServerError('Unable to send quote email');
    }
  }
}
