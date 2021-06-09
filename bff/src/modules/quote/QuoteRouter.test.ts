import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { QuoteRouter } from '.';
import createApp from '../../lib/createApp';
import { mockSalesforceContractPayload } from './fixtures';
import { validateCreateQuote } from './utils';

jest.mock('./utils');

const mockValidateCreateQuote = mocked(validateCreateQuote);

describe('QuoteRouter', () => {
  const createQuoteController = {
    createQuote: jest.fn(),
  };
  const router = QuoteRouter({ createQuoteController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      mockValidateCreateQuote.mockReturnValueOnce(true);
      createQuoteController.createQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/')
        .send(mockSalesforceContractPayload);

      expect(createQuoteController.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
      expect(status).toEqual(200);
    });
  });
});
