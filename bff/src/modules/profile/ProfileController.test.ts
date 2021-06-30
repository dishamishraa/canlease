import ProfileController from './ProfileController';
import { mockSalesforceProfilePayload, mockAddQuotePayload } from './fixture';

describe('ProfileController', () => {
  const profileService = {
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
  };
  const controller = new ProfileController(profileService);

  describe('getProfile', () => {
    it('should call service with id to get profile', async () => {
      await controller.getProfile('1');
      expect(profileService.getProfile).toHaveBeenCalledWith('1');
    });
  });

  describe('createProfile', () => {
    it('should call service with payload to create profile', async () => {
      await controller.createProfile(mockSalesforceProfilePayload);

      expect(profileService.createProfile).toHaveBeenCalledWith(mockSalesforceProfilePayload);
    });
  });

  describe('addQuoteToProfile', () => {
    it('should call service with portal id and payload to create profile', async () => {
      await controller.addQuoteToProfile('1', mockAddQuotePayload);

      expect(profileService.addQuoteToProfile).toHaveBeenCalledWith('1', mockAddQuotePayload);
    });
  });

  describe('getAllQuotesFromProfile', () => {
    it('should call service with portal id to get a list of quotes', async () => {
      await controller.getAllQuotesFromProfile('1');

      expect(profileService.getAllQuotesFromProfile).toHaveBeenCalledWith('1');
    });
  });

  describe('getAllCustomerQuotesFromProfile', () => {
    it('should call service with portal id to get of quotes that belongs to customers', async () => {
      await controller.getAllCustomerQuotesFromProfile('1');

      expect(profileService.getAllCustomerQuotesFromProfile).toHaveBeenCalledWith('1');
    });
  });
});
