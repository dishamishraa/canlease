import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { SALESFORCE_API_URL } from '../../lib/config';
import SalesforceApi from './SalesforceApi';
import { mockSalesforceContractPayload } from './fixtures';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SalesforceApi();
  describe('createQuote', () => {
    it('should make request to check user api endpoint', async () => {
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
    it('should make request to check user api endpoint', async () => {
      const id = 1;
      await api.getQuote(id);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/v2/quotes/${id}`);
    });
  });
});
