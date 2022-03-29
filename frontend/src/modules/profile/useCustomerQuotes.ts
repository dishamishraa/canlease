import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Quote } from '../quote/types';
import { getCustomerQuotes } from './api';

const useCustomerQuotes = (portalId: string): UseGetResult<Quote[]> => {
  const get = useCallback((): Promise<Quote[]> => getCustomerQuotes(portalId), [portalId]);
  return useGet(get);
};

export default useCustomerQuotes;
