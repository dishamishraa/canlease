import { useCallback } from 'react';

import useGet from '../../lib/api/useGet';

import { Quote, CreateQuotePayload } from '../types';

import { createQuote } from './api';

export type UseCreateQuoteResult = {
  loading: boolean;
  error: undefined | Error;
  data: Quote | null;
  refetch: () => void;
};

const useCreateQuote = (payload: CreateQuotePayload): UseCreateQuoteResult => {
  const get = useCallback((): Promise<Quote> => createQuote(payload), [payload]);
  return useGet(get);
};

export default useCreateQuote;
