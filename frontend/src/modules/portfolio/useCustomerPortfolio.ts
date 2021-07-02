import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { Portfolio } from '../types';
import { getCustomerPortfolio } from './api';

export type UseCustomerPortfolioResult = {
  loading: boolean;
  error: undefined | Error;
  data: Portfolio | null;
  refetch: () => void;
};

const useCustomerPortfolio = (portalId: string): UseCustomerPortfolioResult => {
  const get = useCallback((): Promise<Portfolio> => getCustomerPortfolio(portalId), [portalId]);
  return useGet(get);
};

export default useCustomerPortfolio;
