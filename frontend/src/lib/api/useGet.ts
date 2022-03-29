import {
  useReducer, useEffect, Reducer, useState, Dispatch,
} from 'react';
import { State, Action } from './types';
import fetchReducer from './fetchReducer';

export type UseGetResult<TData> = State<TData> & {
  refetch: () => void;
};

const fetchData = async <TData>(
  get: () => Promise<TData>, dispatch: Dispatch<Action<TData>>,
): Promise<void> => {
  try {
    dispatch({ type: 'FETCH_INIT' });
    const data = await get();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', error });
  }
};

const useGet = <TData>(get: () => Promise<TData>): UseGetResult<TData> => {
  const initialState = {
    loading: false,
    data: null,
    error: undefined,
  };
  const [state, dispatch] = useReducer<Reducer<State<TData>, Action<TData>>>(
    fetchReducer,
    initialState,
  );
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetchData<TData>(get, dispatch);
  }, [get, reload]);

  return {
    ...state, refetch: (): void => setReload(reload + 1),
  };
};

export default useGet;
