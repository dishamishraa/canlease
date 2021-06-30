import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { ProfileRouter } from '.';
import createApp from '../../lib/createApp';
import { mockSalesforceProfilePayload, mockAddQuotePayload } from './fixture';
import { validateAddQuote, validateCreateProfile, validateId } from './utils';

jest.mock('./utils');
const mockValidateCreateProfile = mocked(validateCreateProfile);
const mockValidateAddQuote = mocked(validateAddQuote);
const mockValidateId = mocked(validateId);

describe('ProfileRouter', () => {
  const profileController = {
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    addQuoteToProfile: jest.fn(),
    getAllQuotesFromProfile: jest.fn(),
    getAllCustomerQuotesFromProfile: jest.fn(),
  };
  const router = ProfileRouter({ profileController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      mockValidateCreateProfile.mockReturnValueOnce(true);
      const { status } = await request(app)
        .post('/')
        .send(mockSalesforceProfilePayload);

      expect(profileController.createProfile)
        .toHaveBeenCalledWith(mockSalesforceProfilePayload);
      expect(status).toEqual(200);
    });
  });

  describe('GET /:id', () => {
    it('should return a 200 status on success', async () => {
      mockValidateId.mockReturnValueOnce(true);
      const { status } = await request(app)
        .get('/:id')
        .send();

      expect(profileController.getProfile)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });

  describe('GET /:id/quote', () => {
    it('should return a 200 status on success', async () => {
      mockValidateId.mockReturnValueOnce(true);
      const { status } = await request(app)
        .get('/:id/quote')
        .send();

      expect(profileController.getAllQuotesFromProfile)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });

  describe('GET /:id/customer_quote', () => {
    it('should return a 200 status on success', async () => {
      mockValidateId.mockReturnValueOnce(true);
      const { status } = await request(app)
        .get('/:id/customer_quote')
        .send();

      expect(profileController.getAllCustomerQuotesFromProfile)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });
});
