import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { SALESFORCE_API_URL } from '../config';
import SalesforceApi from './SalesforceApi';
import { mockSalesforceApplicationPayload } from '../../modules/application/fixtures';
import { mockSalesforceContractPayload } from '../../modules/quote/fixtures';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SalesforceApi();
  describe('createApplication', () => {
    it('should make request to create application api endpoint', async () => {
      await api.createApplication(mockSalesforceApplicationPayload);
      const expectedBody = {
        payload: {
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
          bankruptcyDetails: mockSalesforceApplicationPayload.bankruptcyDetails,
        },
      };
      expect(mockedAxios.post).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/v2/credit_apps`, expectedBody);
    });
  });
  describe('createQuote', () => {
    it('should make request to check create quote api endpoint', async () => {
      await api.createQuote(mockSalesforceContractPayload);

      const expectedBody = {
        properties: {
          userType: mockSalesforceContractPayload.userType,
          asset: mockSalesforceContractPayload.asset,
          applicationAmount: mockSalesforceContractPayload.applicationAmount,
          leaseType: mockSalesforceContractPayload.leaseType,
          contactName: mockSalesforceContractPayload.contactName,
          contactEmail: mockSalesforceContractPayload.contactEmail,
          contactBusinessName: mockSalesforceContractPayload.contactBusinessName,
          vendorName: mockSalesforceContractPayload.vendorName,
          vendorEmail: mockSalesforceContractPayload.vendorEmail,
          vendorBusinessName: mockSalesforceContractPayload.vendorBusinessName,
          quoteOptions: mockSalesforceContractPayload.quoteOptions,
        },
      };
      expect(mockedAxios.post).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/v2/quotes`, expectedBody);
    });
  });

  describe('getQuote', () => {
    it('should make request to check get quote api endpoint', async () => {
      const id = 1;
      await api.getQuote(id);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/v2/quotes/${id}`);
    });
  });
});
