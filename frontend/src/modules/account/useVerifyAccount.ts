import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { VerifyAccountPayload } from './types';
import { verifyAccount } from './api';

const useVerifyAccount = (): UsePostResult<void, VerifyAccountPayload> => {
  const post = useCallback(
    (payload: VerifyAccountPayload): Promise<void> => verifyAccount(payload),
    [],
  );
  return usePost(post);
};

export default useVerifyAccount;