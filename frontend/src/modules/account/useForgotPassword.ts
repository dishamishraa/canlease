import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { forgotPassword } from './api';

const useForgotPassword = (): UsePostResult<void, string> => {
  const post = useCallback((email: string): Promise<void> => forgotPassword(email), []);
  return usePost(post);
};

export default useForgotPassword;
