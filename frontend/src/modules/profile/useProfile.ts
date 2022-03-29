import { useCallback } from 'react';
import useGet, { UseGetResult } from '../../lib/api/useGet';
import { getProfile } from './api';
import { Profile } from './types';

const useProfile = (): UseGetResult<Profile> => {
  const get = useCallback((): Promise<Profile> => getProfile(), []);
  return useGet(get);
};

export default useProfile;
