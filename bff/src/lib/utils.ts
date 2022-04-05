import Joi from 'joi';
import {
  Request, Response, NextFunction, CookieOptions,
} from 'express';
import { FRONTEND_DOMAIN, IDENTITY_SESSION_COOKIE_NAME } from './config';

const id = Joi.alternatives(
  Joi.string(),
).required();

export const validateId = (value: unknown): value is string => {
  const { error } = id.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const errorWrapper = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void> | void,
) => async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    await callback(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const getCookie = (req: Request, name: string): string | undefined => {
  // check the new style cookie first
  const cookie = req.cookies[name];
  if (cookie) {
    return cookie;
  }
  // otherwise fall back to the legacy cookie
  const legacyCookie = req.cookies[`${name}-legacy`];
  return legacyCookie;
};

export const setCookie = (
  res: Response,
  name: string,
  value?: string,
  maxAge?: number,
): void => {
  // fallback cookie https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients

  const cookieOptions: CookieOptions = {
    domain: FRONTEND_DOMAIN,
    secure: true,
    sameSite: 'none',
  };

  if (maxAge) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + maxAge * 1000);
    cookieOptions.expires = expiryDate;
  }

  // Set the new style cookie
  res.cookie(
    name,
    value,
    cookieOptions,
  );
  // And set the same value in the legacy cookie
  res.cookie(
    `${name}-legacy`,
    value,
    {
      ...cookieOptions,
      sameSite: false,
    },
  );
};

export const createAuthHeader = (identityToken: string): { headers: any } => ({
  headers: {
    Cookie: `${IDENTITY_SESSION_COOKIE_NAME}=${identityToken}`,
  },
});
