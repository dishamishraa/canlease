import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { QuoteRouter } from '.';
import createApp from '../../lib/createApp';
import { mockSalesforceContractPayload, mockSendGridPayload } from './fixtures';
import { validateCreateQuote, validateSendQuote, validateGetQuote } from './utils';

jest.mock('./utils');

const mockValidateCreateQuote = mocked(validateCreateQuote);
const mockValidateSendQuote = mocked(validateSendQuote);
const mockValidateGetQuote = mocked(validateGetQuote);

describe('QuoteRouter', () => {
  const quoteController = {
    createApplication: jest.fn(),
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
  };
  const router = QuoteRouter({ quoteController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      mockValidateCreateQuote.mockReturnValueOnce(true);
      quoteController.createQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/')
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

  describe('GET /:id', () => {
    it('should return a 200 status on success', async () => {
      mockValidateGetQuote.mockReturnValueOnce(true);
      quoteController.getQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .get('/:id')
        .send();

      expect(quoteController.getQuote).toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });
});
