import mockCreateQuote from '../../lib/salesforce/fixtures/mockCreateQuote';
import mockSendQuote from './fixtures/mockSendQuote';
import QuoteService from './QuoteService';

describe('QuoteService', () => {
  const salesforceApi = {
    createApplication: jest.fn(),
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
    createRateCard: jest.fn(),
  };
  const communicationApi = {
    sendQuote: jest.fn(),
  };

  const service = new QuoteService(salesforceApi, communicationApi);

  describe('createQuote', () => {
    it('should call api with payload', async () => {
      await service.createQuote(mockCreateQuote);
      expect(salesforceApi.createQuote).toHaveBeenCalledWith(mockCreateQuote);
    });
  });

  describe('getQuote', () => {
    it('should call api with id', async () => {
      await service.getQuote('1');
      expect(salesforceApi.getQuote).toHaveBeenCalledWith('1');
    });
  });

  describe('sendQuote', () => {
    it('should call api with payload', async () => {
      await service.sendQuote(mockSendQuote);
      expect(communicationApi.sendQuote).toHaveBeenCalledWith(mockSendQuote);
    });
  });
});
