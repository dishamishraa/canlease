export type Application = {
  creditAppNumber: string;
  createdDate: string;
  applicationAmount: number;
  description: string;
  creditStatus: string;
  applicationStatus: string;
  quoteId: string;
  asset: string;
}
export type Lease = {
  leaseNumber: string;
  leaseStartDate: string;
  leaseEndDate: string;
  fullTerm: number;
  vendorName: string;
  vendorInvoice: number;
  assets: string;
  paymentBeforeTax: number;
  purchaseOptionDate: string;
  optionAmount: number;
  quoteId: string;
}

export type Portfolio = {
  createApps: Application[];
  leases: Lease[];
};

export interface PortfolioControllerContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}

export interface PortfolioServiceContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}
