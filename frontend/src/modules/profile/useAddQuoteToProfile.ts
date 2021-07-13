import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { addQuoteToProfile } from './api';

export type UseCreateSaveQuote = UsePostResult<void, string>

const useAddQuoteToProfile = (portalId: string): UseCreateSaveQuote => {
    const get = useCallback(
        (quoteId: string): Promise<void> => addQuoteToProfile(portalId, { quoteId }), 
        [portalId],
    );
    return usePost(get);
};

export default useAddQuoteToProfile;