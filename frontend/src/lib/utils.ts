import Cookies from 'js-cookie';
import { INSTANT_QUOTE_COOKIE } from '../lib/config';
import { AfterAuthAction } from '../modules/types';

export const isEmptyString = (value?: string) => (value ? value.trim().length === 0 : true);

export const isObject = (value: any) => typeof value === 'object' && !Array.isArray(value) && value !== null;

export const isEmpty = (value: any) => (
  value === undefined
    || value == null
    || (isObject(value) && Object.keys(value).length === 0)
    || value.length === 0
);

export const convertMonth = (value: string): number => {
  return parseInt(value.toLowerCase().replace('m', ''));
}

export const getStretchMonth = (value: number): number => {
  switch(value) {
    case 24:
      return 27;
    case 36:
      return 40;
    case 48:
      return 52;
    case 60:
      return 66;
    default:
      return value;
  }
}

export const isExpiring = (value: string) => {
  const date = new Date(value);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays < 6 && diffDays > 0;
}

export const isExpired = (value: string) => {
  const today = new Date();
  const expiryDate = new Date(value);
  return today > expiryDate;
};

export const createdOn = (value: string) => {
  const date = new Date(value);
  date.setDate(date.getDate() - 30);
  return date;
};

export const isEmail = (value: string) => {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(value);
};

export const updateInstaQuoteCookie = (
  update: { 
    action?: AfterAuthAction;
  },
  setCookie, 
  removeCookie, 
) => {
  const { quoteId, expires } = getQuoteCookie();
  removeCookie(INSTANT_QUOTE_COOKIE);
  setCookie(INSTANT_QUOTE_COOKIE, 
    {
      ...update,
      quoteId,
      expires,
    }, 
    { 
      expires: new Date(expires), 
    },
  );
}

export const getQuoteCookie = () => {
  const quoteCookie = Cookies.get(INSTANT_QUOTE_COOKIE);
  let quoteCookieObj;
  if (quoteCookie){
     quoteCookieObj = JSON.parse(quoteCookie)
  }
  return quoteCookieObj;
}