import { BFF_URL } from './config';

export const getServerUrl = (): string => {
  if (!BFF_URL) {
    throw new Error('BFF url not set');
  }
  return BFF_URL;
};

export const isEmptyString = (value, trim = true) => {
  if (value) {
    return trim && value ? value.trim().length === 0 : value.length === 0;
  }
  return true; 
}