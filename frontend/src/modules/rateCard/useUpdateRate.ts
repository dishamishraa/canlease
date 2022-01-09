import { useCallback } from 'react';
import useUpdate, { UseUpdateResult } from '../../lib/api/useUpdate';
import { Rate, UpdateRate } from './types';
import { updateRate } from './api';

const useUpdateRate = (): UseUpdateResult<Rate, UpdateRate> => {
  const update = useCallback((payload: UpdateRate): Promise<Rate> => updateRate(payload), []);
  return useUpdate(update);
};

export default useUpdateRate;
