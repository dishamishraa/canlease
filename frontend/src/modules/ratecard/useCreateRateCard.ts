import { useCallback } from 'react';

import usePost, { UsePostResult } from '../../lib/api/usePost';
import { RateCard, CreateRateCard} from './types';
import { createRateCard } from './api';

const useCreateRateCard = (): UsePostResult<RateCard, CreateRateCard> => {
  const get = useCallback((payload: CreateRateCard): Promise<RateCard> => createRateCard(payload), []);
  return usePost(get);
};

export default useCreateRateCard;
