export const VALID_USER_TYPES = [
  'customer',
  'vendor',
  'rep',
] as const;
export type UserType = typeof VALID_USER_TYPES[number];

export type CreateQuote = {
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

export interface CreateQuoteControllerContract {
  createQuote(payload: CreateQuote): Promise<void>;
}

export interface CreateQuoteServiceContract {
  createQuote(payload: CreateQuote): Promise<void>;
}
