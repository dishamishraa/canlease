import { useCallback } from 'react';
import useDelete, { UseDeleteResult } from '../../lib/api/useDelete';
import { deleteRateCard } from './api';

const useDeleteRateCard = (): UseDeleteResult<void> => {
  const get = useCallback((id: number): Promise<void> => deleteRateCard(id), []);
  return useDelete(get);
};

export default useDeleteRateCard;


