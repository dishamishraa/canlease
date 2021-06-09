import QuoteController from './QuoteController';
import { mockSalesforceContractPayload } from './fixtures';

describe('QuoteController', () => {
  const createQuoteService = {
    createQuote: jest.fn(),
  };
  const controller = new QuoteController(createQuoteService);

  describe('createQuote', () => {
    it('should call service with payload', async () => {
      await controller.createQuote(mockSalesforceContractPayload);

      expect(createQuoteService.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
    });
  });
});
