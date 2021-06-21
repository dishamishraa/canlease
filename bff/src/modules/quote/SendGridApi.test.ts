import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { send } from '@sendgrid/mail';
import createError from 'http-errors';
import {
  SENDGRID_API_URL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_QUOTE_TEMPLATE_ID,
} from '../../lib/config';
import SendGridApi from './SendGridApi';
import { mockSendGridPayload } from './fixtures';

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
      await api.sendQuote(mockSendGridPayload);
      expect(mockedSend).toHaveBeenCalledWith({
        to: 'test@testmail.com',
        from: SENDGRID_FROM_EMAIL,
        dynamicTemplateData: {
          action_url: 'https://www.redthreadinnovations.com',
        },
        templateId: SENDGRID_QUOTE_TEMPLATE_ID,
      });
    });
  });
  it('should throw FailedToSendEmail on error', async () => {
    mockedSend.mockRejectedValue({});

    await expect(api.sendQuote(mockSendGridPayload))
      .rejects.toThrowError(createError.InternalServerError);
  });
});
