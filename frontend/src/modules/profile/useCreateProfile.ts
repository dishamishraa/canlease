import { useCallback } from 'react';
import usePost, { UsePostResult } from '../../lib/api/usePost';
import { createProfile } from './api';
import { CreateProfilePayload, Profile } from './types';

const useCreateProfile = (): UsePostResult<Profile, CreateProfilePayload> => {
  const post = useCallback(
    (payload: CreateProfilePayload): Promise<Profile> => createProfile(payload),
    [],
  );
  return usePost(post);
};

export default useCreateProfile;
