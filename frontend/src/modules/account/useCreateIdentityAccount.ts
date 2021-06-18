import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { AccountTokenResponse, IdentityAccountPayload } from '../types';
import { createIdentityAccount } from './api';

export type IdentityAccountResult = {
  loading: boolean;
  error: undefined | Error;
  data: AccountTokenResponse | null;
  refetch: () => void;
};

const useCreateIdentityAccount = () => {
  const post = useCallback((payload: IdentityAccountPayload): Promise<AccountTokenResponse> => createIdentityAccount(payload), []);
  return usePost(post);
};

export default useCreateIdentityAccount;
