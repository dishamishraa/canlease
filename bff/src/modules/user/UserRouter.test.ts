import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { UserRouter } from '.';
import { IDENTITY_SESSION_COOKIE_NAME } from '../../lib/config';
import createApp from '../../lib/createApp';
import { mockErrorWrapper } from '../../lib/fixtures/errorWrapper';
import * as utils from '../../lib/utils';
import { mockIdentityTokenPayload } from './fixtures';
import { decodeIdentityToken } from './utils';

jest.mock('./utils');
jest.mock('../../lib/utils');

const mockedDecodeIdentityToken = mocked(decodeIdentityToken);

const mockedGetCookie = jest.spyOn(utils, 'getCookie');
jest.spyOn(utils, 'errorWrapper').mockImplementation(mockErrorWrapper);

describe('UserRouter', () => {
  const router = UserRouter();
  const app = createApp(router);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const token = 'token';

  describe('GET /me', () => {
    it('should return user', async () => {
      mockedGetCookie.mockReturnValueOnce(token);
      mockedDecodeIdentityToken.mockReturnValueOnce(mockIdentityTokenPayload);

      const { status } = await request(app)
        .get('/me')
        .set('Cookie', [`${IDENTITY_SESSION_COOKIE_NAME}=${token}`])
        .send({});

      expect(status).toEqual(301);
    });

    it('should return 401 if no identity token cookie present', async () => {
      const { status, body } = await request(app)
        .get('/me')
        .set('Cookie', [])
        .send({});

      expect(status).toEqual(401);
      expect(body).toEqual({
        code: 401,
        type: 'UnauthorizedError',
        message: 'Authentication Error',
      });
    });
  });
});
