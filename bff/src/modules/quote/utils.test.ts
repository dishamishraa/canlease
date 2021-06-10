import { validateCreateQuote, validateSendQuote } from './utils';

describe('quote utils', () => {
  describe('validateCreateQuote', () => {
    it('should return true if valid payload', () => {
      const valid = validateCreateQuote({
        userType: 'customer',
        asset: 'asset',
        applicationAmount: 0,
        leaseType: 'leaseType',
        contactName: 'contactName',
        contactEmail: 'contact@email.com',
        contactBusinessName: 'contactBusinessName',
        vendorName: 'vendorName',
        vendorEmail: 'vendor@email.com',
        vendorBusinessName: 'vendorBusinessName',
        quoteOptions: [
          {
            monthlyAmount: 0,
            term: 'term',
            financeRate: 0,
            purchaseOptionDate: new Date('2020-01-01T01:00:00Z'),
          },
        ],
      });
      expect(valid).toBe(true);
    });
    it('should return false for invalid payload', () => {
      const valid = validateCreateQuote({});

      expect(valid).toBe(false);
    });
  });

  describe('validateSendQuote', () => {
    it('should return true if valid payload', () => {
      const valid = validateSendQuote({
        vendorBusinessName: 'vendorBusinessName',
        from: {
            email: "orders@example.com",
            name: "Example Order Confirmation"
        },
        template_id: "[template_id]",
        personalizations: [{
            to: [
            {
                email: "john_doe@example.com",
                name: "John Doe"
            },
            ],
            subject: "Your Example Order Confirmation",
        }],
      });
      expect(valid).toBe(true);
    });
    it('should return false for invalid payload', () => {
      const valid = validateSendQuote({});

      expect(valid).toBe(false);
    });
  });
});
