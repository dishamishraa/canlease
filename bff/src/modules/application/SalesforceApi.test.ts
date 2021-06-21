import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { SALESFORCE_API_URL } from '../../lib/config';
import SalesforceApi from './SalesforceApi';
import { mockSalesforceApplicationPayload } from './fixtures';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SalesforceApi();
  describe('createApplication', () => {
    it('should make request to create application api endpoint', async () => {
      await api.createApplication(mockSalesforceApplicationPayload);
      const expectedBody = {
        properties: {
            leasePortalId: mockSalesforceApplicationPayload.leasePortalId,
            operatingName: mockSalesforceApplicationPayload.operatingName,
            businessName: mockSalesforceApplicationPayload.businessName,
            businessType: mockSalesforceApplicationPayload.businessType,
            yearsInBusiness: mockSalesforceApplicationPayload.yearsInBusiness,
            contactName: mockSalesforceApplicationPayload.contactName,
            contactEmail: mockSalesforceApplicationPayload.contactEmail,
            contactPhone: mockSalesforceApplicationPayload.contactPhone,
            contactWebsite: mockSalesforceApplicationPayload.contactWebsite,
            street: mockSalesforceApplicationPayload.street,
            city: mockSalesforceApplicationPayload.city,
            province: mockSalesforceApplicationPayload.province,
            postalCode: mockSalesforceApplicationPayload.postalCode,
            term: mockSalesforceApplicationPayload.term,
            applicationAmount: mockSalesforceApplicationPayload.applicationAmount,
            asset: mockSalesforceApplicationPayload.asset,
            condition: mockSalesforceApplicationPayload.condition,
            ageOfAsset: mockSalesforceApplicationPayload.ageOfAsset,
            businessOwnerName: mockSalesforceApplicationPayload.businessOwnerName,
            businessOwnerStreet: mockSalesforceApplicationPayload.businessOwnerStreet,
            businessOwnerCity: mockSalesforceApplicationPayload.businessOwnerCity,
            bankruptcy: mockSalesforceApplicationPayload.bankruptcy,
            creditCheckConsent: mockSalesforceApplicationPayload.creditCheckConsent,
            sin: mockSalesforceApplicationPayload.sin,
            dob: mockSalesforceApplicationPayload.dob,
            vendorPortalId: mockSalesforceApplicationPayload.vendorPortalId,
            quoteId: mockSalesforceApplicationPayload.quoteId,
            expectedDeliveryDate: mockSalesforceApplicationPayload.expectedDeliveryDate,
            bankruptcyDetails: mockSalesforceApplicationPayload.bankruptcyDetails
        },
      };
      expect(mockedAxios.post).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/v2/credit_apps`, expectedBody);
    });
  });
});
