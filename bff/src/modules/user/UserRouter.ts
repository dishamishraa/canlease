import { Router, Request, Response } from 'express';
import { IDENTITY_SESSION_COOKIE_NAME, IDENTITY_URL } from '../../lib/config';
import { UnauthorizedError } from '../../lib/errors';
import { errorWrapper, getCookie } from '../../lib/utils';
import { decodeIdentityToken } from './utils';

export function createUserRouter(): Router {
  const router = Router();

  /**
   * @swagger
   * /users/me:
   *    post:
   *      tags:
   *      - User
   *      summary: "Gets the currently logged in user"
   *      responses:
   *        200:
   *          description: OK
   *        401:
   *          description: Unauthorized Error
   *          schema:
   *            $ref: '#/definitions/Error'
   */
  router.get('/me', errorWrapper((req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    if (!identityToken) {
      throw UnauthorizedError();
    }

    const identityTokenPayload = decodeIdentityToken(identityToken);
    if (!identityTokenPayload) {
      throw UnauthorizedError();
    }
    // TODO update implementation to pull user profile from salesforce
    res.redirect(`${IDENTITY_URL}/users/${identityTokenPayload.id}`, 301);
  }));

  return router;
}
