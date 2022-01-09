import { useCallback } from 'react';
import useUpdate, { UseUpdateResult } from '../../lib/api/useUpdate';
import { RateCard, UpdateRateCard } from './types';
import { updateRateCard } from './api';

const useUpdateRateCard = (): UseUpdateResult<RateCard, UpdateRateCard> => {
  const update = useCallback(
    (payload: UpdateRateCard): Promise<RateCard> => updateRateCard(payload.id, payload),
    [],
  );
  return useUpdate(update);
};

export default useUpdateRateCard;
