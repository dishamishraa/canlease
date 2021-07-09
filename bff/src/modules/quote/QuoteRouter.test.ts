import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { QuoteRouter } from '.';
import createApp from '../../lib/createApp';
import mockCreateQuote from '../../lib/salesforce/fixtures/mockCreateQuote';
import mockSendQuote from './fixtures/mockSendQuote';

describe('QuoteRouter', () => {
  const quoteController = {
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    sendQuote: jest.fn(),
  };
  const router = QuoteRouter({ quoteController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      quoteController.createQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/')
        .send(mockCreateQuote);

      expect(quoteController.createQuote).toHaveBeenCalledWith(mockCreateQuote);
      expect(status).toEqual(200);
    });
  });

  describe('POST /send', () => {
    it('should return a 200 status on success', async () => {
      quoteController.sendQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/send')
        .send(mockSendQuote);

      expect(quoteController.sendQuote).toHaveBeenCalledWith(mockSendQuote);
      expect(status).toEqual(200);
    });
  });

  describe('GET /:id', () => {
    it('should return a 200 status on success', async () => {
      quoteController.getQuote.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .get('/abc')
        .send();

      expect(quoteController.getQuote).toHaveBeenCalledWith('abc');
      expect(status).toEqual(200);
    });
  });
});
