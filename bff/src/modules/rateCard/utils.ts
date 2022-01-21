import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { decodeIdentityToken } from '../profile/utils';

export const isAdmin = async (identityToken?: string): Promise<boolean> => {
  const salesforceApi = new SalesforceApi();
  if (!identityToken) {
    return false;
  }
  
  const identityTokenPayload = decodeIdentityToken(identityToken);

  if (identityTokenPayload) {
    const profile = await salesforceApi.getProfile(identityTokenPayload.uuid);
    return profile.userType === 'admin';
  }

  return false;
};