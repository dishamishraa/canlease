import mockCreateApplication from '../../lib/salesforce/fixtures/mockCreateApplication';
import ApplicationService from './ApplicationService';

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

  const service = new ApplicationService(salesforceApi);

  describe('createApplication', () => {
    it('should call api with payload', async () => {
      await service.createApplication(mockCreateApplication);

      expect(salesforceApi.createApplication)
        .toHaveBeenCalledWith(mockCreateApplication);
    });
  });
});
