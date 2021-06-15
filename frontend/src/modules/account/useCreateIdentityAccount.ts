import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { CreateAccountPayload } from '../types';
import { createIdentityAccount } from './api';

export type useCreateIdentityAccountPayload = {
  loading: boolean;
  error: undefined | Error;
  data: any | null;
  refetch: () => void;
};

const useCreateIdentityAccount = (payload: CreateAccountPayload): useCreateIdentityAccountPayload => {
  const post = useCallback((): Promise<any> => createIdentityAccount(payload), [payload]);
  return usePost(post);
};

export default useCreateIdentityAccount;
