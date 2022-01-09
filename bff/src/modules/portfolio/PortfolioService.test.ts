import PortfolioService from './PortfolioService';

describe('PortfolioService', () => {
  const salesforceApi = {
    createApplication: jest.fn(),
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
  };

  const service = new PortfolioService(salesforceApi);

  describe('getUserPortfolio', () => {
    it('should call api with portal id', async () => {
      await service.getUserPortfolio('1');
      expect(salesforceApi.getUserPortfolio).toHaveBeenCalledWith('1');
    });
  });

  describe('getCustomerPortfolio', () => {
    it('should call api with portal id', async () => {
      await service.getCustomerPortfolio('1');
      expect(salesforceApi.getCustomerPortfolio).toHaveBeenCalledWith('1');
    });
  });
});
