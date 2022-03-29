import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { CreateRate, Rate } from './types';
import { createRate } from './api';

const useCreateRate = (): UsePostResult<Rate, CreateRate> => {
  const post = useCallback((payload: CreateRate): Promise<Rate> => createRate(payload), []);
  return usePost(post);
};

export default useCreateRate;
