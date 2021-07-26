import { useCallback } from 'react';
import useDelete, { UseDeleteResult } from '../../lib/api/useDelete';
import { deleteRate } from "./api";

const useDeleteRate = (): UseDeleteResult<void> => {
    const get = useCallback((rateId: number): Promise<void> => deleteRate(rateId), []);
    return useDelete(get);
  };
  
export default useDeleteRate;