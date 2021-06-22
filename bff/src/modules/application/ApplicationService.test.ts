import ApplicationService from './ApplicationService';
import { mockSalesforceApplicationPayload } from './fixtures';

describe('QuoteService', () => {
  const salesforceApi = {
    createApplication: jest.fn(),
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
