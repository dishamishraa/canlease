import request from 'supertest';
import { ApplicationRouter } from '.';
import createApp from '../../lib/createApp';
import mockCreateApplication from '../../lib/salesforce/fixtures/mockCreateApplication';

describe('ApplicationRouter', () => {
  const applicationController = {
    createApplication: jest.fn(),
  };
  const router = ApplicationRouter({ applicationController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      applicationController.createApplication.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/')
        .send(mockCreateApplication);

      expect(applicationController.createApplication)
        .toHaveBeenCalledWith(mockCreateApplication);
      expect(status).toEqual(204);
    });
  });
});
