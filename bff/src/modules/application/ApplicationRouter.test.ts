import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { ApplicationRouter } from '.';
import createApp from '../../lib/createApp';
import { mockSalesforceApplicationPayload } from './fixtures';
import { validateCreateApplication } from './utils';

jest.mock('./utils');

const mockValidateCreateApplication = mocked(validateCreateApplication);

describe('ApplicationRouter', () => {
  const applicationController = {
    createApplication: jest.fn(),
  };
  const router = ApplicationRouter({ applicationController });
  const app = createApp(router);

  describe('POST /', () => {
    it('should return a 200 status on success', async () => {
      mockValidateCreateApplication.mockReturnValueOnce(true);
      applicationController.createApplication.mockResolvedValueOnce(undefined);

      const { status } = await request(app)
        .post('/')
        .send(mockSalesforceApplicationPayload);

      expect(applicationController.createApplication)
        .toHaveBeenCalledWith(mockSalesforceApplicationPayload);
      expect(status).toEqual(200);
    });
  });
});
