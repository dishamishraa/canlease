import useUpdate, { UseUpdateResult} from "../../lib/api/useUpdate";
import { Rate, UpdateRate } from './types';
import { useCallback } from 'react';
import { updateRate } from "./api";

const useUpdateRate = (rateId: string): UseUpdateResult<Rate, UpdateRate> => {
    const update = useCallback((payload: UpdateRate): Promise<Rate> => updateRate(rateId, payload), []);
    return useUpdate(update);
}

export default useUpdateRate;