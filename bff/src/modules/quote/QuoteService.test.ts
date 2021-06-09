import QuoteService from './QuoteService';
import { mockSalesforceContractPayload } from './fixtures';

describe('QuoteService', () => {
  const salesforceApi = {
    createQuote: jest.fn(),
  };
  const service = new QuoteService(salesforceApi);

  describe('createQuote', () => {
    it('should call api with payload', async () => {
      await service.createQuote(mockSalesforceContractPayload);

      expect(salesforceApi.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
    });
  });
});
