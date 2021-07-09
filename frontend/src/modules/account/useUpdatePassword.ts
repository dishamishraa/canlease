import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { updatePassword } from './api';
import { UpdatePasswordPayload } from './types';

const useUpdatePassword = (): UsePostResult<void, UpdatePasswordPayload> => {
  const post = useCallback(
    (payload: UpdatePasswordPayload): Promise<void> => updatePassword(payload),
    [],
  );
  return usePost(post);
};

export default useUpdatePassword;
