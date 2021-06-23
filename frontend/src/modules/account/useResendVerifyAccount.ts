import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { resendVerifyAccount } from './api'


const useResendVerifyAccount = () => {
    const post = useCallback((email: string): Promise<void> => resendVerifyAccount(email), []);
    return usePost(post);
}

export default useResendVerifyAccount