import QuoteController from './QuoteController';
import { mockSalesforceContractPayload, mockSendGridPayload } from './fixtures';

describe('QuoteController', () => {
  const createQuoteService = {
    createQuote: jest.fn(),
    sendQuote: jest.fn(),
  };
  const controller = new QuoteController(createQuoteService);

  describe('createQuote', () => {
    it('should call service with payload', async () => {
      await controller.createQuote(mockSalesforceContractPayload);

      expect(createQuoteService.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
    });
  });
  describe('sendQuote', () => {
    it('should call service with payload', async () => {
      await controller.sendQuote(mockSendGridPayload);

      expect(createQuoteService.sendQuote).toHaveBeenCalledWith(mockSendGridPayload);
    });
  });
});
