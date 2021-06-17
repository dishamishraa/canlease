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
  SALESFORCE_API_URL = '',

  SENDGRID_API_URL = '',
  SENDGRID_API_KEY = '',
  SENDGRID_FROM_EMAIL = '',
  SENDGRID_QUOTE_TEMPLATE_ID = '',
  SENDGRID_SIGN_UP_TEMPLATE_ID = '',
  SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID = '',
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID = '',

  IDENTITY_SESSION_COOKIE_NAME = '',
} = process.env;

export const IS_DEV = process.env.NODE_ENV === 'development';
