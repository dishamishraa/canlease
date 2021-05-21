import { Dispatch, useEffect, useReducer } from 'react';
import { getServerUrl } from '../../lib/utils';

export async function getServiceStatus(): Promise<void> {
  await fetch(getServerUrl(), {
    credentials: 'include',
  });
}

export type ServiceStatusState = {
  loading: boolean;
  error: undefined | Error;
};

const stateReducer = (
  state: ServiceStatusState,
  changes: ServiceStatusState,
): ServiceStatusState => ({
  ...state,
  ...changes,
});

const dispatchError = (
  dispatch: Dispatch<ServiceStatusState>,
  error: Error,
): void => dispatch({
  loading: false,
  error: error,
});

const dispatchResults = (
  dispatch: Dispatch<ServiceStatusState>,
): void => dispatch({
  loading: false,
  error: undefined,
});

export const useServiceStatus = (): ServiceStatusState => {
  const [state, dispatch] = useReducer(stateReducer, {
    loading: true,
    error: undefined,
  });

  useEffect(() => {
    getServiceStatus()
      .then(() => {
        dispatchResults(dispatch);
      })
      .catch((error) => {
        dispatchError(dispatch, error);
      });
  }, []);

  return state;
};
