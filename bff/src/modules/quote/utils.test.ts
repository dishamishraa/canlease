import { validateSendQuote } from './utils';

describe('quote utils', () => {
  describe('validateSendQuote', () => {
    it('should return true if valid payload', () => {
      const valid = validateSendQuote({
        email: 'vendorBusinessName',
        quoteId: 'abc',
      });
      expect(valid).toBe(true);
    });
    it('should return false for invalid payload', () => {
      const valid = validateSendQuote({});

      expect(valid).toBe(false);
    });
  });
});
