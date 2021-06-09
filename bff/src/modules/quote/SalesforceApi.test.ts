import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { SALESFORCE_API_URL } from '../../lib/config';
import SalesforceApi from './SalesforceApi';
import { mockSalesforceContractPayload } from './fixtures';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SalesforceApi();
  describe('createContact', () => {
    it('should call valid salesforceApi endpoint with valid post body', async () => {
      mockedAxios.post.mockResolvedValueOnce(undefined);

      await api.createQuote(mockSalesforceContractPayload);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${SALESFORCE_API_URL}/v2/quotes`,
        {
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
        },
      );
    });
  });
});
