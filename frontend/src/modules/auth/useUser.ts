import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { getUser } from './api';
import { User } from '../types';

export type UseUserResult = {
  loading: boolean;
  error: undefined | Error;
  data: User | null;
  refetch: () => void;
};

const useUser = (): UseUserResult => {
  const get = useCallback((): Promise<User> => getUser(), []);
  return useGet(get);
}

export default useUser;