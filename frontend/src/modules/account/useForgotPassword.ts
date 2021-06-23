import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { forgotPassword } from './api'


const useForgotPassword = () => {
    const post = useCallback((email: string): Promise<void> => forgotPassword(email), []);
    return usePost(post);
}

export default useForgotPassword