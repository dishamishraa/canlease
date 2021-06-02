import {
  useReducer, Reducer, Dispatch,
} from 'react';
import { State, Action } from './types';
import fetchReducer from './fetchReducer';

type UseUpdateResult<TData, TPayload> = [
  State<TData>,
  (payload: TPayload) => Promise<void>,
];

const updateData = async <TData, TPayload>(
  update: (payload: TPayload) => Promise<TData>,
  payload: TPayload,
  dispatch: Dispatch<Action<TData>>,
): Promise<void> => {
  try {
    dispatch({ type: 'FETCH_INIT' });
    const data = await update(payload);
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', error });
  }
};

const useUpdate = <TData, TPayload = TData>(
  update: (payload: TPayload) => Promise<TData>,
): UseUpdateResult<TData, TPayload> => {
  const initialState = {
    loading: false,
    data: null,
    error: undefined,
  };
  const [state, dispatch] = useReducer<Reducer<State<TData>, Action<TData>>>(
    fetchReducer,
    initialState,
  );

  return [state, (payload: TPayload): Promise<void> => updateData(update, payload, dispatch)];
};

export default useUpdate;
