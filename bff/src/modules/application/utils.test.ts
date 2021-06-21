import { validateCreateApplication } from './utils';
import { mockSalesforceApplicationPayload } from './fixtures';

describe('application utils', () => {
  describe('validateCreateApplication', () => {
    it('should return true if valid payload', () => {
      const valid = validateCreateApplication({
        leasePortalId: 'string',
        operatingName: 'string',
        businessName: 'string',
        businessType: 'corporation',
        yearsInBusiness: 0,
        contactName: 'string',
        contactEmail: 'string',
        contactPhone: 'string',
        contactWebsite: 'string',
        street: 'string',
        city: 'string',
        province: 'string',
        postalCode: 'string',
        term: '12M',
        applicationAmount: 0,
        asset: 'string',
        condition: 'new',
        ageOfAsset: 0,
        businessOwnerName: 'string',
        businessOwnerStreet: 'string',
        businessOwnerCity: 'string',
        bankruptcy: true,
        creditCheckConsent: true,
        sin: 'string',
        dob: 'string',
        vendorPortalId: 'string',
        quoteId: 'string',
        expectedDeliveryDate: 'string',
        bankruptcyDetails: 'string',
      });
      expect(valid).toBe(true);
    });
    it('should return false for invalid payload', () => {
      const valid = validateCreateApplication({});
      expect(valid).toBe(false);
    });
  });
});
