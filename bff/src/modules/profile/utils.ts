import decode from 'jwt-decode';
import { IdentityTokenPayload } from './types';

export const decodeIdentityToken = (token: string): IdentityTokenPayload | null => {
  try {
    return decode<IdentityTokenPayload>(token);
  } catch {
    return null;
  }
};
