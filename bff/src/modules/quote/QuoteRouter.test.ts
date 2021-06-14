import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { QuoteRouter } from '.';
import createApp from '../../lib/createApp';
import { mockSalesforceContractPayload, mockSendGridPayload } from './fixtures';
import { validateCreateQuote, validateSendQuote } from './utils';

jest.mock('./utils');

const mockValidateCreateQuote = mocked(validateCreateQuote);
const mockValidateSendQuote = mocked(validateSendQuote);

describe('QuoteRouter', () => {
  const quoteController = {
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    sendQuote: jest.fn(),
  };
  const router = QuoteRouter({ quoteController });
  const app = createApp(router);

  describe('POST /create', () => {
    it('should return a 200 status on success', async () => {
      mockValidateCreateQuote.mockReturnValueOnce(true);
      quoteController.createQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/create')
        .send(mockSalesforceContractPayload);

      expect(quoteController.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
      expect(status).toEqual(200);
    });
  });

  describe('POST /send', () => {
    it('should return a 200 status on success', async () => {
      mockValidateSendQuote.mockReturnValueOnce(true);
      quoteController.sendQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/send')
        .send(mockSendGridPayload);

      expect(quoteController.sendQuote).toHaveBeenCalledWith(mockSendGridPayload);
      expect(status).toEqual(200);
    });
  });
});
