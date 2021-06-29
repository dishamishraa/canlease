export type Portfolio = {
  createApps: [
    {
      creditAppNumber: string;
      createdDate: string;
      applicationAmount: number;
      description: string;
      creditStatus: string;
      applicationStatus: string;
      quoteId: string;
      asset: string;
    }
  ];
  leases: [
    {
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
  ];
};

export interface PortfolioControllerContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}

export interface PortfolioServiceContract {
  getUserPortfolio(portalId: string): Promise<Portfolio>;
  getCustomerPortfolio(portalId: string): Promise<Portfolio>;
}
