import SalesforceApi from '../../lib/salesforce/SalesforceApi';

import { Portfolio, PortfolioServiceContract } from './types';

export default class PortfolioService implements PortfolioServiceContract {
  private api: SalesforceApi;

  constructor(api: SalesforceApi) {
    this.api = api;
  }

  async getUserPortfolio(portalId: string): Promise<Portfolio> {
    return this.api.getUserPortfolio(portalId);
  }

  async getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    return this.api.getCustomerPortfolio(portalId);
  }
}
