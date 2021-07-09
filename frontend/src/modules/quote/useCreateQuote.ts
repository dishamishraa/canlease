import { useCallback } from 'react';

import useGet from '../../lib/api/useGet';
import usePost, { UsePostResult } from '../../lib/api/usePost';

import { Quote, CreateQuotePayload } from '../types';

import { createQuote } from './api';

export type UseCreateQuoteResult = UsePostResult<Quote, CreateQuotePayload>;

const useCreateQuote = (): UseCreateQuoteResult => {
  const get = useCallback((payload: CreateQuotePayload): Promise<Quote> => createQuote(payload), []);
  return usePost(get);
};

export default useCreateQuote;
