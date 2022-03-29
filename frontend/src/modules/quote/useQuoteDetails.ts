import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { Quote } from './types';
import { getQuote } from './api';

const useQuoteDetails = (quoteId: string): UseGetResult<Quote> => {
  const get = useCallback((): Promise<Quote> => getQuote(quoteId), [quoteId]);
  return useGet(get);
};

export default useQuoteDetails;
