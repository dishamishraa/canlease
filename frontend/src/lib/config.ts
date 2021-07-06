declare global {
  interface Window {
    env: any;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const {
  REACT_APP_DOMAIN: DOMAIN = window.env?.REACT_APP_DOMAIN,
  REACT_APP_BFF_URL: BFF_URL = window.env?.REACT_APP_BFF_URL,
  REACT_APP_FRONTEND_URL: FRONTEND_URL = window.env?.REACT_APP_FRONTEND_URL,
  REACT_APP_SESSION_COOKIE_NAME: SESSION_COOKIE_NAME =
  window.env?.REACT_APP_SESSION_COOKIE_NAME,
  REACT_APP_IS_DEV: IS_DEV = false,
  INSTANT_QUOTE_COOKIE = 'instantQuote',
  AUTH_COOKIE = 'auth-token',
  MAX_AGE = 6 * 30.5 * 24 * 3600 * 1000,
} = process.env;
