import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { AccountTokenResponse } from '../types';
import { resendVerifyAccount } from './api'

const useResendVerifyAccount = (email: string) => {
    const post = useCallback((): Promise<AccountTokenResponse> => resendVerifyAccount(email), []);
    return usePost(post);
}

export default useResendVerifyAccount