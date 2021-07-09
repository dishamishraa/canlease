import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { AccountTokenResponse, SignInPayload } from '../types';
import { signIn } from './api';

export type useSignInResult = UsePostResult<AccountTokenResponse, SignInPayload>;

const useSignIn = (): useSignInResult => {
  const post = useCallback((payload: SignInPayload): Promise<AccountTokenResponse> => signIn(payload), []);
  return usePost(post);
};

export default useSignIn;
