import ApplicationController from './ApplicationController';
import { mockSalesforceApplicationPayload } from './fixtures';

describe('QuoteController', () => {
  const createApplicationService = {
    createApplication: jest.fn(),
  };
  const controller = new ApplicationController(createApplicationService);

  describe('createQuote', () => {
    it('should call service with payload to create quote', async () => {
      await controller.createApplication(mockSalesforceApplicationPayload);

      expect(createApplicationService.createApplication)
        .toHaveBeenCalledWith(mockSalesforceApplicationPayload);
    });
  });
});
