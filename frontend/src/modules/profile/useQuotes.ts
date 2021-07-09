import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Quote } from '../quote/types';
import { getQuotes } from './api';

const useQuotes = (portalId: string): UseGetResult<Quote[]> => {
  const get = useCallback((): Promise<Quote[]> => getQuotes(portalId), [portalId]);
  return useGet(get);
};

export default useQuotes;
