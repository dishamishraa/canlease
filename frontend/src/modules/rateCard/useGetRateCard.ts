import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { getRateCard } from './api';
import { RateCard } from './types';

const useGetRateCard = (rateCardId: string): UseGetResult<RateCard> => {
  const get = useCallback((): Promise<RateCard> => getRateCard(rateCardId), [rateCardId]);
  return useGet(get);
};

export default useGetRateCard;
