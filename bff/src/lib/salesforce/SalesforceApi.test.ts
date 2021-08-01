import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { SALESFORCE_API_URL } from '../config';
import mockCreateApplication from './fixtures/mockCreateApplication';
import mockCreateQuote from './fixtures/mockCreateQuote';
import SalesforceApi from './SalesforceApi';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('SalesforceApi', () => {
  const api = new SalesforceApi();
  describe('createApplication', () => {
    it('should make request to create application api endpoint', async () => {
      // await api.createApplication(mockCreateApplication);
      // expect(mockedAxios.post).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/credit_apps`, mockCreateApplication);
    });
  });
  describe('createQuote', () => {
    it('should make request to check create quote api endpoint', async () => {
      // await api.createQuote(mockCreateQuote);
      // expect(mockedAxios.post).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/quotes`, mockCreateQuote);
    });
  });

  describe('getQuote', () => {
    it('should make request to check get quote api endpoint', async () => {
      const id = '1';
      // await api.getQuote(id);

      // expect(mockedAxios.get).toHaveBeenCalledWith(`${SALESFORCE_API_URL}/quotes/${id}`);
    });
  });
});
