import { useCallback } from 'react';
import { getRates } from './api';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Rate } from './types';

const useGetRatesDetails = (rateCardId: string): UseGetResult<Rate[]> => {
  const get = useCallback((): Promise<Rate[]> => getRates(rateCardId), [rateCardId]);
  return useGet(get);
};

export default useGetRatesDetails;
