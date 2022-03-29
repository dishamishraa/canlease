import { Portfolio } from '../../lib/salesforce/types';

export interface PortfolioControllerContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}

export interface PortfolioServiceContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}
