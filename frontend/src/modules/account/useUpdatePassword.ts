import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { updatePassword } from './api';
import { UpdatePasswordPayload } from '../types'

const useUpdatePassword = () => {
  const post = useCallback((payload: UpdatePasswordPayload): Promise<void> => updatePassword(payload), []);
  return usePost(post)
}

export default useUpdatePassword;
