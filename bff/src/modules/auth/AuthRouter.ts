import { Router, Request, Response } from 'express';
import {
  BFF_URL, IDENTITY_URL, FRONTEND_URL, IDENTITY_SESSION_COOKIE_NAME,
} from '../../lib/config';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper, setCookie } from '../../lib/utils';
import AuthApi from './AuthApi';

export function createAuthRouter(): Router {
  const router = Router();
  const authApi = new AuthApi();

  router.get('/login', errorWrapper((req: Request, res: Response) => {
    const { target_uri: targetUri } = req.query;
    if (!targetUri || typeof targetUri !== 'string') {
      throw BadRequestError('Invalid target uri provided');
    }
    const targetUriEncoded = Buffer.from(targetUri).toString('base64');

    const newTargetUri = `${BFF_URL}/auth/success?destination=${targetUriEncoded}`;
    const destinationUri = `${IDENTITY_URL}/oauth/auth0/token?target_uri=${newTargetUri}`;

    res.set('Cache-Control', 'no-store');
    res.redirect(301, destinationUri);
  }));

  router.get('/success', errorWrapper(async (req: Request, res: Response) => {
    const { destination, code } = req.query;

    if (!code || typeof code !== 'string') {
      throw BadRequestError('Invalid code');
    }

    const { token } = await authApi.exchangeCode(code);

    let destinationUri: string = FRONTEND_URL;
    if (destination && typeof destination === 'string') {
      destinationUri = Buffer.from(destination, 'base64').toString('ascii');
    }

    setCookie(res, IDENTITY_SESSION_COOKIE_NAME, token);
    res.set('Cache-Control', 'no-store');
    res.redirect(301, destinationUri);
  }));

  router.get('/logout', (req: Request, res: Response) => {
    res.redirect(`${IDENTITY_URL}/oauth/auth0/logout`);
  });

  return router;
}
