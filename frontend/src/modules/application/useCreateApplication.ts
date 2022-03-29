import usePost, { UsePostResult } from '../../lib/api/usePost';
import createApplication from './api';
import { CreateApplicationPayload } from './types';

export type UseCreateApplicationResult = UsePostResult<void, CreateApplicationPayload>;
const useCreateApplication = (): UseCreateApplicationResult => usePost(
  async (payload: CreateApplicationPayload) => {
    await createApplication(payload);
  },
);

export default useCreateApplication;
