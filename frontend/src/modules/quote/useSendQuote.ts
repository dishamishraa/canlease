import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { sendQuote } from './api';
import { SendQuote } from './types';

export type UseSendQuoteResult = UsePostResult<void, SendQuote>

const useSendQuote = (): UseSendQuoteResult => {
    const get = useCallback((payload: SendQuote): Promise<void> => sendQuote(payload), []);
    return usePost(get);
};

export default useSendQuote;
