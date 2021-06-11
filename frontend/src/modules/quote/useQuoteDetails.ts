import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { Quote } from '../types';
import { getQuote } from './api';

export type UseQuoteDetailsResult = {
  loading: boolean;
  error: undefined | Error;
  data: Quote | null;
  refetch: () => void;
};

const useQuoteDetails = (quoteId: number | string): UseQuoteDetailsResult => {
  const get = useCallback((): Promise<Quote> => getQuote(quoteId), [quoteId]);
  return useGet(get);
};

export default useQuoteDetails;
