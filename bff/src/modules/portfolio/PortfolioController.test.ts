import PortfolioController from './PortfolioController';

describe('ProfileController', () => {
  const profileService = {
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
  };
  const controller = new PortfolioController(profileService);

  describe('getUserPortfolio', () => {
    it('should call service with portal id to get a user portfolio', async () => {
      await controller.getUserPortfolio('1');

      expect(profileService.getUserPortfolio).toHaveBeenCalledWith('1');
    });
  });

  describe('getCustomerPortfolio', () => {
    it('should call service with portal id to get a customer portfolio', async () => {
      await controller.getCustomerPortfolio('1');

      expect(profileService.getCustomerPortfolio).toHaveBeenCalledWith('1');
    });
  });
});