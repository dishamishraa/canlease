import mockCreateQuote from '../../lib/salesforce/fixtures/mockCreateQuote';
import mockSendQuote from './fixtures/mockSendQuote';
import QuoteController from './QuoteController';

describe('QuoteController', () => {
  const createQuoteService = {
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    sendQuote: jest.fn(),
  };
  const controller = new QuoteController(createQuoteService);

  describe('createQuote', () => {
    it('should call service with payload to create quote', async () => {
      await controller.createQuote(mockCreateQuote);

      expect(createQuoteService.createQuote).toHaveBeenCalledWith(mockCreateQuote);
    });
  });
  describe('getQuote', () => {
    it('should call service with id', async () => {
      await controller.getQuote('abc');

      expect(createQuoteService.getQuote).toHaveBeenCalledWith('abc');
    });
  });
  describe('sendQuote', () => {
    it('should call service with payload to send quote', async () => {
      await controller.sendQuote(mockSendQuote);

      expect(createQuoteService.sendQuote).toHaveBeenCalledWith(mockSendQuote);
    });
  });
});
