export type User = {
  id: number;
  uuid: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
};

export type Quote = {
  quoteId: string;
  asset: string;
  applicationAmount: number;
  quoteOptions: QuoteOption[];
  quoteExpiryDate: string;
}

export enum Term {
  TwelveMonths = "12M",
  TwentyFourMonths = "24M",
  ThirtySixMonths = "36M",
  FourtyEightMonths = "48M",
  SixtyMonths = "60M",
  SeventyTwoMonths = "72M"
}

export type QuoteOption = {
  monthlyAmount: number;
  term: Term.TwelveMonths | Term.TwentyFourMonths | Term.ThirtySixMonths | Term.FourtyEightMonths | Term.SixtyMonths | Term.SeventyTwoMonths;
  financeRate: number;
  purchaseOptionDate; string;
}

export type CreditApplication = {
  creditAppNumber: string;
  createdDate: string;
  applcicationAmount: number;
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
