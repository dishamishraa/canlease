import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { Quote } from '../types';
import { getAllCustomerQuotesFromProfile } from './api';

export type useAllCustomerQuotesFromProfileResult = {
  loading: boolean;
  error: undefined | Error;
  data: Quote[] | null;
  refetch: () => void;
};

const useAllCustomerQuotesFromProfile = (portalId: string): useAllCustomerQuotesFromProfileResult => {
  const get = useCallback((): Promise<Quote[]>  => getAllCustomerQuotesFromProfile(portalId), [portalId]);
  return useGet(get);
};

export default useAllCustomerQuotesFromProfile;
