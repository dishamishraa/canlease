import ProfileService from './ProfileService';
import { mockSalesforceProfilePayload, mockAddQuotePayload } from './fixture';

describe('QuoteService', () => {
  const salesforceApi = {
    createApplication: jest.fn(),
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
  };

  const service = new ProfileService(salesforceApi);

  describe('getProfile', () => {
    it('should call api with portal id', async () => {
      await service.getProfile(1);

      expect(salesforceApi.getProfile)
        .toHaveBeenCalledWith(1);
    });
  });

  describe('createProfile', () => {
    it('should call api with payload', async () => {
      await service.createProfile(mockSalesforceProfilePayload);

      expect(salesforceApi.createProfile)
        .toHaveBeenCalledWith(mockSalesforceProfilePayload);
    });
  });

  describe('addQuoteToProfile', () => {
    it('should call api with portal id and payload', async () => {
      await service.addQuoteToProfile(1, mockAddQuotePayload);

      expect(salesforceApi.addQuoteToProfile)
        .toHaveBeenCalledWith(1, mockAddQuotePayload);
    });
  });

  describe('getAllQuotesFromProfile', () => {
    it('should call api with portal id', async () => {
      await service.getAllQuotesFromProfile(1);

      expect(salesforceApi.getAllQuotesFromProfile)
        .toHaveBeenCalledWith(1);
    });
  });

  describe('getAllCustomerQuotesFromProfile', () => {
    it('should call api with portal id', async () => {
      await service.getAllCustomerQuotesFromProfile(1);

      expect(salesforceApi.getAllCustomerQuotesFromProfile)
        .toHaveBeenCalledWith(1);
    });
  });
});
