import { Portfolio } from '../../lib/salesforce/types';
import { PortfolioControllerContract, PortfolioServiceContract } from './types';

export default class PortfolioController implements PortfolioControllerContract {
  private service: PortfolioServiceContract;

  constructor(service: PortfolioServiceContract) {
    this.service = service;
  }

  getUserPortfolio(portalId: string): Promise<Portfolio> {
    return this.service.getUserPortfolio(portalId);
  }

  getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    return this.service.getCustomerPortfolio(portalId);
  }
}
