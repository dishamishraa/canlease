import { BFF_URL } from './config';

export const getServerUrl = (): string => {
  if (!BFF_URL) {
    throw new Error('BFF url not set');
  }
  return BFF_URL;
};

export const isEmptyString = (value) => (value ? value.trim().length === 0 : true);

export const isObject = (value) => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value == null ||
    (isObject(value) && Object.keys(value).length === 0) ||
    value.length === 0
  )
}
