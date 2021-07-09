import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { updateName } from './api';
import { UpdateNamePayload } from '../types'

const useUpdateName = () => {
  const post = useCallback((payload: UpdateNamePayload): Promise<void> => updateName(payload), []);
  return usePost(post);
}

export default useUpdateName;
