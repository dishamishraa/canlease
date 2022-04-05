import { Router, Request, Response } from 'express';
import { decode, Jwt, JwtPayload } from 'jsonwebtoken';
import {
  BFF_URL, IDENTITY_URL, FRONTEND_URL, IDENTITY_SESSION_COOKIE_NAME,
} from '../../lib/config';
import { BadRequestError, UnauthorizedError } from '../../lib/errors';
import { errorWrapper, getCookie, setCookie } from '../../lib/utils';
import AuthApi from './AuthApi';

const getTokenMaxAge = (token: string) => {
  const jwt = decode(token, { complete: true });
  const expireTimestamp = (jwt?.payload as JwtPayload)?.exp || 0;
  return expireTimestamp - (Date.now() / 1000);
};

export function createAuthRouter(): Router {
  const router = Router();
  const authApi = new AuthApi();

  router.post('/token', errorWrapper(async (req: Request, res: Response) => {
    const response = await authApi.signIn(req.body);
    const { token } = response;

    setCookie(res, IDENTITY_SESSION_COOKIE_NAME, token, getTokenMaxAge(token));
    res.status(200).send(response);
  }));

  router.post('/accounts', errorWrapper(async (req: Request, res: Response) => {
    const response = await authApi.signUp(req.body);
    const { token } = response;

    setCookie(res, IDENTITY_SESSION_COOKIE_NAME, token, getTokenMaxAge(token));
    res.status(201).send(response);
  }));

  return router;
}
