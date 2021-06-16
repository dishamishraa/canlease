export const VALID_USER_TYPES = [
  'customer',
  'vendor',
  'rep',
] as const;
export type UserType = typeof VALID_USER_TYPES[number];

export type CreateQuote = CreateQuoteCustomer | CreateQuoteVendor;

export type CreateQuoteCustomer = {
  userType: UserType;
  asset: string;
  applicationAmount: number;
  leaseType: string;
  contactName: string;
  contactEmail: string;
  contactBusinessName: string;
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
  quoteOptions: [
    {
      monthlyAmount: number;
      term: string;
      financeRate: number;
      purchaseOptionDate: string;
    }
  ];
};

export type CreateQuoteVendor = CreateQuoteCustomer & {
  vendorName: string;
  vendorEmail: string;
  vendorBusinessName: string;
};

export type SendQuote = {
  from: {
    email: string;
    name: string;
  };
  template_id: string;
  personalizations: [{
    to: [
      {
        email: string;
        name: string;
      },
    ];
    subject: string;
  }];
};

export type QuoteOption = {
  monthlyAmount: number;
  term: string;
  financeRate: number;
  purchaseOptionDate: string;
};

export type Quote = {
  quoteId: string;
  asset: string;
  applicationAmount: number;
  quoteOptions: QuoteOption[];
  quoteExpiryDate: string;
};

export interface QuoteControllerContract {
  createQuote(payload: CreateQuote): Promise<Quote>;
  getQuote(quoteId: number | string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
}

export interface QuoteServiceContract {
  createQuote(payload: CreateQuote): Promise<Quote>;
  getQuote(quoteId: number | string): Promise<Quote>;
  sendQuote(payload: SendQuote): Promise<void>;
}
