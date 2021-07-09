import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { AccountResponse, SignInPayload } from './types';
import { signIn } from './api';

const useSignIn = (): UsePostResult<AccountResponse, SignInPayload> => {
  const post = useCallback(
    (payload: SignInPayload): Promise<AccountResponse> => signIn(payload),
    [],
  );
  return usePost(post);
};

export default useSignIn;
