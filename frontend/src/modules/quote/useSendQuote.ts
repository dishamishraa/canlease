import { useCallback } from 'react';

import useGet from '../../lib/api/useGet';
import usePost, { UsePostResult } from '../../lib/api/usePost';

import { Quote, SendQuotePayload } from '../types';

import { sendQuote } from './api';

export type UseCreateQuoteResult = UsePostResult<void, SendQuotePayload>

const useSendQuote = (): UseCreateQuoteResult => {
  const get = useCallback((payload: SendQuotePayload): Promise<void> => sendQuote(payload), []);
  return usePost(get);
};

export default useSendQuote;
