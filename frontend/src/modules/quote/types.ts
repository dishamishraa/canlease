export type Quote = {
    quoteId: string;
    asset: string;
    applicationAmount: number;
    quoteOptions: QuoteOption[];
    quoteExpiryDate: string;
  }

export type CreateQuotePayload = {
    userType: string,
    asset: string,
    applicationAmount: number,
    leaseType: string,
    contactName: string,
    contactEmail: string,
    vendorName: string,
    vendorEmail: string,
    contactBusinessName: string,
    vendorBusinessName: string,
    quoteOptions: QuoteOption[]
};

export type QuoteOption = {
  monthlyAmount: number;
  term: Term.TwelveMonths | Term.TwentyFourMonths | Term.ThirtySixMonths | Term.FourtyEightMonths | Term.SixtyMonths | Term.SeventyTwoMonths;
  financeRate: number;
  purchaseOptionDate; string;
}

export enum Term {
  TwelveMonths = "12M",
  TwentyFourMonths = "24M",
  ThirtySixMonths = "36M",
  FourtyEightMonths = "48M",
  SixtyMonths = "60M",
  SeventyTwoMonths = "72M"
}