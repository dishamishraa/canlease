import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { RateCard } from './types';
import { getRateCards } from './api';

const useCustomerQuotes = (portalId: string): UseGetResult<RateCard[]> => {
  const get = useCallback((): Promise<RateCard[]> => getRateCards(portalId), [portalId]);
  return useGet(get);
};

export default useCustomerQuotes;
