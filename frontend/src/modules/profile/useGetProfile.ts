import { useCallback } from 'react';
import useGet from '../../lib/api/useGet';
import { getProfile } from './api';
import { Profile } from '../types'


const useGetProfile = (id: string) => {
  const get = useCallback((): Promise<Profile> => getProfile(id), []);
  return useGet(get)
}

export default useGetProfile;