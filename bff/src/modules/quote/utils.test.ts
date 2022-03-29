import mockSendQuote from './fixtures/mockSendQuote';
import { validateSendQuote } from './utils';

describe('quote utils', () => {
  describe('validateSendQuote', () => {
    it('should return true if valid payload', () => {
      const valid = validateSendQuote(mockSendQuote);
      expect(valid).toBe(true);
    });
    it('should return false for invalid payload', () => {
      const valid = validateSendQuote({});
      expect(valid).toBe(false);
    });
  });
});
