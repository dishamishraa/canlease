import { BFF_URL } from './config';

export const getServerUrl = (): string => {
  if (!BFF_URL) {
    throw new Error('BFF url not set');
  }
  return BFF_URL;
};

export const isEmptyString = (value) => (value ? value.trim().length === 0 : true);

export const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

export const isEmpty = (value) => (
  value === undefined
    || value == null
    || (isObject(value) && Object.keys(value).length === 0)
    || value.length === 0
);


export const isExpiring = (value) => {
  const date = new Date(value); 
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays > 25 && 29 < diffDays;
}
export const isExpired = (value) => {
  const today = new Date();
  const expiryDate = new Date(value);
  return today > expiryDate;
}
export const createdOn = (value) => {
  const date = new Date(value);
  date.setDate(date.getDate()-30)
  return date.toDateString();
}
export const isEmail = (value) => {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(value);
};

