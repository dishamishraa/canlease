import { useCallback } from 'react';

import usePost, { UsePostResult } from '../../lib/api/usePost';
import { Quote, CreateQuotePayload } from './types';
import { createQuote } from './api';

const useCreateQuote = (): UsePostResult<Quote, CreateQuotePayload> => {
  const get = useCallback((payload: CreateQuotePayload): Promise<Quote> => createQuote(payload), []);
  return usePost(get);
};

export default useCreateQuote;
