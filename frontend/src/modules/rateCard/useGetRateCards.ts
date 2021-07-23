import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { RateCard } from './types';
import { getRateCards } from './api';

const useGetRateCards = (): UseGetResult<RateCard[]> => {
  const get = useCallback((): Promise<RateCard[]> => getRateCards(), []);
  return useGet(get);
};

export default useGetRateCards;
