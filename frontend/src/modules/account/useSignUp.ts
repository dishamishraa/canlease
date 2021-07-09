import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { signUp } from './api';
import { AccountResponse, SignUpPayload } from './types';

const useSignUp = (): UsePostResult<AccountResponse, SignUpPayload> => {
  const post = useCallback(
    (payload: SignUpPayload): Promise<AccountResponse> => signUp(payload),
    [],
  );
  return usePost(post);
};

export default useSignUp;
