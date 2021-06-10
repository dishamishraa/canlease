import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { 
    SENDGRID_API_URL,
    SENDGRID_API_KEY,
    SENDGRID_FROM_EMAIL,
 } from '../../lib/config';
import SendGridApi from './SendGridApi';
import { mockSendGridPayload } from './fixtures';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SendGridApi();
  describe('createContact', () => {
    it('should call valid sendGridApi endpoint with valid post body', async () => {
      mockedAxios.post.mockResolvedValueOnce(undefined);

      await api.sendQuote(mockSendGridPayload);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${SENDGRID_API_URL}/v3/mail/send/${SENDGRID_API_KEY}`,
        {
          properties: {
            from:  SENDGRID_FROM_EMAIL,
                template_id: mockSendGridPayload.template_id,
                personalizations: mockSendGridPayload.personalizations,
          },
        },
      );
    });
  });
});
