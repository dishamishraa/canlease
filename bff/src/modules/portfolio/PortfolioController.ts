import { Portfolio, PortfolioControllerContract, PortfolioServiceContract,} from './types';

export default class PortfolioController implements PortfolioControllerContract {
  private service: PortfolioServiceContract;

  constructor(service: PortfolioServiceContract) {
    this.service = service;
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    return this.service.getUserPortfolio(portalId);
  }
  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    return this.service.getCustomerPortfolio(portalId);
  }
}