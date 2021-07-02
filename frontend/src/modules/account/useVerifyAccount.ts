import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { AccountTokenResponse } from '../types';
import { verifyAccount } from './api'

const useVerifyAccount = (id: number) => {
    const post = useCallback((token: string): Promise<AccountTokenResponse> => verifyAccount(id, token), []);
    return usePost(post);
}

export default useVerifyAccount