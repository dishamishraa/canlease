import { useCallback } from 'react';
import usePost from '../../lib/api/usePost';
import { createProfile } from './api';
import { CreateProfilePayload, Profile } from '../types'


const useCreateProfile = () => {
  const post = useCallback((payload: CreateProfilePayload): Promise<Profile> => createProfile(payload), []);
  return usePost(post)
}

export default useCreateProfile;