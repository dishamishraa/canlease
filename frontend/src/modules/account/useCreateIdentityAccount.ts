import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { Account, IdentityAccountPayload } from '../types';
import { createIdentityAccount } from './api';


export type useCreateIdentityAccountResult = UsePostResult<Account, IdentityAccountPayload>

const useCreateIdentityAccount = (): useCreateIdentityAccountResult => {
  const post = useCallback((payload: IdentityAccountPayload): Promise<Account> => createIdentityAccount(payload), []);
  return usePost(post);
};

export default useCreateIdentityAccount;
