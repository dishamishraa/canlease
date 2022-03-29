import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { Portfolio } from '../../lib/salesforce/types';
import { PortfolioServiceContract } from './types';

export default class PortfolioService implements PortfolioServiceContract {
  private salesforceApi: SalesforceApi;

  constructor(salesforceApi: SalesforceApi) {
    this.salesforceApi = salesforceApi;
  }

  getUserPortfolio(portalId: string): Promise<Portfolio> {
    return this.salesforceApi.getUserPortfolio(portalId);
  }

  getCustomerPortfolio(portalId: string): Promise<Portfolio> {
    return this.salesforceApi.getCustomerPortfolio(portalId);
  }
}
