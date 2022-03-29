import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Portfolio } from './types';
import { getCustomerPortfolio } from './api';

const useCustomerPortfolio = (portalId: string): UseGetResult<Portfolio> => {
  const get = useCallback((): Promise<Portfolio> => getCustomerPortfolio(portalId), [portalId]);
  return useGet(get);
};

export default useCustomerPortfolio;
