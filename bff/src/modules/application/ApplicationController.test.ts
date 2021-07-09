import mockCreateApplication from '../../lib/salesforce/fixtures/mockCreateApplication';
import ApplicationController from './ApplicationController';

describe('QuoteController', () => {
  const createApplicationService = {
    createApplication: jest.fn(),
  };
  const controller = new ApplicationController(createApplicationService);

  describe('createQuote', () => {
    it('should call service with payload to create quote', async () => {
      await controller.createApplication(mockCreateApplication);

      expect(createApplicationService.createApplication)
        .toHaveBeenCalledWith(mockCreateApplication);
    });
  });
});
