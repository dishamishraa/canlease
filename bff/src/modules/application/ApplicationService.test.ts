import ApplicationService from './ApplicationService';
import { mockSalesforceApplicationPayload } from './fixtures';

describe('QuoteService', () => {
  const salesforceApi = {
    createApplication: jest.fn(),
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
  };

  const service = new ApplicationService(salesforceApi);

  describe('createApplication', () => {
    it('should call api with payload', async () => {
      await service.createApplication(mockSalesforceApplicationPayload);

      expect(salesforceApi.createApplication)
        .toHaveBeenCalledWith(mockSalesforceApplicationPayload);
    });
  });
});
