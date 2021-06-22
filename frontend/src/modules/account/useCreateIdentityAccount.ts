import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { AccountTokenResponse, AccountRequest } from '../types';
import { createIdentityAccount } from './api';


export type useCreateIdentityAccountResult = UsePostResult<AccountTokenResponse, AccountRequest>

const useCreateIdentityAccount = (): useCreateIdentityAccountResult => {
  const post = useCallback((payload: AccountRequest): Promise<AccountTokenResponse> => createIdentityAccount(payload), []);
  return usePost(post);
};

export default useCreateIdentityAccount;
