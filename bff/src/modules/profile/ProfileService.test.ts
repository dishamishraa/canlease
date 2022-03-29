import mockAddQuote from '../../lib/salesforce/fixtures/mockAddQuote';
import mockCreateProfile from '../../lib/salesforce/fixtures/mockCreateProfile';
import ProfileService from './ProfileService';

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

  const service = new ProfileService(salesforceApi);

  describe('getProfile', () => {
    it('should call api with portal id', async () => {
      await service.getProfile('1');
      expect(salesforceApi.getProfile).toHaveBeenCalledWith('1');
    });
  });

  describe('createProfile', () => {
    it('should call api with payload', async () => {
      await service.createProfile(mockCreateProfile);
      expect(salesforceApi.createProfile).toHaveBeenCalledWith(mockCreateProfile);
    });
  });

  describe('addQuoteToProfile', () => {
    it('should call api with portal id and payload', async () => {
      await service.addQuoteToProfile('1', mockAddQuote.quoteId);
      expect(salesforceApi.addQuoteToProfile).toHaveBeenCalledWith('1', mockAddQuote);
    });
  });

  describe('getAllQuotesFromProfile', () => {
    it('should call api with portal id', async () => {
      await service.getAllQuotesFromProfile('1');
      expect(salesforceApi.getAllQuotesFromProfile).toHaveBeenCalledWith('1');
    });
  });

  describe('getAllCustomerQuotesFromProfile', () => {
    it('should call api with portal id', async () => {
      await service.getAllCustomerQuotesFromProfile('1');
      expect(salesforceApi.getAllCustomerQuotesFromProfile).toHaveBeenCalledWith('1');
    });
  });
});
