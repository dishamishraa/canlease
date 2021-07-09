import request from 'supertest';
import { PortfolioRouter } from '.';
import createApp from '../../lib/createApp';

describe('PortfolioRouter', () => {
  const portfolioController = {
    getUserPortfolio: jest.fn(),
    getCustomerPortfolio: jest.fn(),
  };
  const router = PortfolioRouter({ portfolioController });
  const app = createApp(router);

  describe('GET /:id', () => {
    it('should return a 200 status on success', async () => {
      const { status } = await request(app)
        .get('/:id')
        .send();

      expect(portfolioController.getUserPortfolio)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });

  describe('GET /:id/customer_portfolio', () => {
    it('should return a 200 status on success', async () => {
      const { status } = await request(app)
        .get('/:id/customer_portfolio')
        .send();

      expect(portfolioController.getCustomerPortfolio)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });
});
