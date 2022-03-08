import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { decodeIdentityToken } from '../profile/utils';

const isValidUserType = async (userType: string, identityToken?: string): Promise<boolean> => {
  const salesforceApi = new SalesforceApi();
  if (!identityToken || !userType) {
    return false;
  }

  const identityTokenPayload = decodeIdentityToken(identityToken);

  if (identityTokenPayload) {
    const profile = await salesforceApi.getProfile(identityTokenPayload.uuid);
    return profile.userType === userType;
  }

  return false;
};

export const isAdmin = async (identityToken?: string): Promise<boolean> => isValidUserType('admin', identityToken);

export const isRep = async (identityToken?: string): Promise<boolean> => isValidUserType('rep', identityToken);
