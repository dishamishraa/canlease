import request from 'supertest';
import { ProfileRouter } from '.';
import createApp from '../../lib/createApp';
import mockCreateProfile from '../../lib/salesforce/fixtures/mockCreateProfile';

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
      const { status } = await request(app)
        .post('/')
        .send(mockCreateProfile);

      expect(profileController.createProfile)
        .toHaveBeenCalledWith(mockCreateProfile);
      expect(status).toEqual(200);
    });
  });

  // TODO fix the /me test
  // describe('GET /:id', () => {
  //   it('should return a 200 status on success', async () => {
  //     const { status } = await request(app)
  //       .get('/abc')
  //       .send();

  //     expect(profileController.getProfile)
  //       .toHaveBeenCalledWith('abc');
  //     expect(status).toEqual(200);
  //   });
  // });

  describe('GET /:id/quote', () => {
    it('should return a 200 status on success', async () => {
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
      const { status } = await request(app)
        .get('/:id/customer_quote')
        .send();

      expect(profileController.getAllCustomerQuotesFromProfile)
        .toHaveBeenCalledWith(':id');
      expect(status).toEqual(200);
    });
  });
});
