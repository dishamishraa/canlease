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

const useAllCustomerQuotesFromProfile = (quoteId: number | string): useAllCustomerQuotesFromProfileResult => {
  const get = useCallback((): Promise<Quote[]>  => getAllCustomerQuotesFromProfile(quoteId), [quoteId]);
  return useGet(get);
};

export default useAllCustomerQuotesFromProfile;
