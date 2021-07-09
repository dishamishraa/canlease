import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { resendVerifyAccount } from './api';

const useResendVerifyAccount = (): UsePostResult<void, string> => {
  const post = useCallback((email: string): Promise<void> => resendVerifyAccount(email), []);
  return usePost(post);
};

export default useResendVerifyAccount;
