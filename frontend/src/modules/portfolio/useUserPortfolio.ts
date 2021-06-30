import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { Portfolio } from '../types';
import { getUserPortfolio } from './api';

export type UseUserPortfolioResult = {
  loading: boolean;
  error: undefined | Error;
  data: Portfolio | null;
  refetch: () => void;
};

const useUserPortfolio = (portalId: string): UseUserPortfolioResult => {
  const get = useCallback((): Promise<Portfolio> => getUserPortfolio(portalId), [portalId]);
  return useGet(get);
};

export default useUserPortfolio;
