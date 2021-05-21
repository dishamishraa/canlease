import dotenv from 'dotenv';

dotenv.config();

export const {
  /**
   * Port to mount server on to
   */
  PORT = Number(process.env.BACKEND_PORT) || 3000,

  BFF_URL = '',

  FRONTEND_URL = '',
  FRONTEND_DOMAIN = '',

  IDENTITY_URL = '',

  /**
   * Proxy Timeout Duration
   */
  PROXY_TIMEOUT = 30000,

  IDENTITY_SESSION_COOKIE_NAME = '',
} = process.env;

export const IS_DEV = process.env.NODE_ENV === 'development';
