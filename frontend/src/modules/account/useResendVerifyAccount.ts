import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { resendVerifyAccount } from './api'


const useResendVerifyAccount = () => {
    const handleResendVerifyAccount = useCallback((email: string): Promise<void> => resendVerifyAccount(email), []);
    return usePost(handleResendVerifyAccount);
}

export default useResendVerifyAccount