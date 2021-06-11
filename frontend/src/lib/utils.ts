import { BFF_URL } from './config';

export const getServerUrl = (): string => {
  if (!BFF_URL) {
    throw new Error('BFF url not set');
  }
  return BFF_URL;
};

export const isEmptyString = (value) => (value ? value.trim().length === 0 : true);
