import { getRates } from "./api";
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Rate } from './types';
import { useCallback } from 'react';

const useGetRatesDetails = (rateCardId: string): UseGetResult<Rate[]> => {
    const get = useCallback((): Promise<Rate[]> => getRates(rateCardId), [rateCardId]);
    return useGet(get);
  };
  
export default useGetRatesDetails;
  