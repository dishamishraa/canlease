import { useCallback } from 'react';
import { deleteRate } from "./api";

const useDeleteRate = (rateId: string): void=> {
    useCallback((): Promise<void> => deleteRate(rateId), []);
}

export default useDeleteRate;