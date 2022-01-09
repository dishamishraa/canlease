import { send } from '@sendgrid/mail';
import createError from 'http-errors';
import SendGridApi from './SendGridApi';
import mockSendQuote from './fixtures/mockSendQuote';
import {
  SENDGRID_FROM_EMAIL,
  SENDGRID_QUOTE_TEMPLATE_ID,
} from '../../lib/config';

jest.mock('@sendgrid/mail');

describe('SendGridAPI', () => {
  const api = new SendGridApi();
  const mockedSend = (send as jest.Mock);

  beforeEach(() => {
    mockedSend.mockReset();
  });

  describe('sendQuote', () => {
    it('should send quote email', async () => {
      mockedSend.mockResolvedValue({});
      await api.sendQuote(mockSendQuote);
      expect(mockedSend).toHaveBeenCalledWith({
        to: 'test@testmail.com',
        from: SENDGRID_FROM_EMAIL,
        dynamicTemplateData: {
          action_url: '/instaQuote/abc',
          company_name: 'potato company',
          sign_up_link: '/account/signUp',
          submitted_by: 'some guy (guy@potato.ca)',
        },
        templateId: SENDGRID_QUOTE_TEMPLATE_ID,
      });
    });
  });

  it('should throw FailedToSendEmail on error', async () => {
    mockedSend.mockRejectedValue({});
    await expect(api.sendQuote(mockSendQuote))
      .rejects.toThrowError(createError.InternalServerError);
  });
});
