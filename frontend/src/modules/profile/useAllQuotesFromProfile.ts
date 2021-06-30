import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { Quote } from '../types';
import { getAllQuotesFromProfile } from './api';

export type useAllQuotesFromProfileResult = {
  loading: boolean;
  error: undefined | Error;
  data: Quote[] | null;
  refetch: () => void;
};

const useAllQuotesFromProfile = (portalId: string): useAllQuotesFromProfileResult => {
  const get = useCallback((): Promise<Quote[]>  => getAllQuotesFromProfile(portalId), [portalId]);
  return useGet(get);
};

export default useAllQuotesFromProfile;
