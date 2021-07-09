import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Portfolio } from './types';
import { getUserPortfolio } from './api';

const useUserPortfolio = (portalId: string): UseGetResult<Portfolio> => {
  const get = useCallback((): Promise<Portfolio> => getUserPortfolio(portalId), [portalId]);
  return useGet(get);
};

export default useUserPortfolio;
