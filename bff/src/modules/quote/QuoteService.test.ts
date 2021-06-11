import QuoteService from './QuoteService';
import { mockSalesforceContractPayload, mockSendGridPayload } from './fixtures';

describe('QuoteService', () => {
  const salesforceApi = {
    createQuote: jest.fn(),
    getQuote: jest.fn(),
  };
  const sendGridApi = {
    sendQuote: jest.fn(),
  };

  const service = new QuoteService(salesforceApi, sendGridApi);

  describe('createQuote', () => {
    it('should call api with payload', async () => {
      await service.createQuote(mockSalesforceContractPayload);

      expect(salesforceApi.createQuote).toHaveBeenCalledWith(mockSalesforceContractPayload);
    });
  });

  describe('getQuote', () => {
    it('should call api with id', async () => {
      await service.getQuote(1);

      expect(salesforceApi.getQuote).toHaveBeenCalledWith(1);
    });
  });

  describe('sendQuote', () => {
    it('should call api with payload', async () => {
      await service.sendQuote(mockSendGridPayload);

      expect(sendGridApi.sendQuote).toHaveBeenCalledWith(mockSendGridPayload);
    });
  });
});
