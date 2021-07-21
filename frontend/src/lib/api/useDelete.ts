import {
    useReducer, Reducer, Dispatch,
  } from 'react';
  import { State, Action, APIResponse } from './types';
  import fetchReducer from './fetchReducer';

  export type UseDeleteResult<TData> = [
    State<TData>,
    (id: number) => Promise<APIResponse<TData>>,
  ];

  const deleteData = async <TData>(
    onDelete: (id: number) => Promise<TData>, id: number, dispatch: Dispatch<Action<TData>>,
  ): Promise<APIResponse<TData>> => {
    
    const response: APIResponse<TData> = {
      data: null,
      error: undefined,
    };
    try {
      dispatch({ type: 'FETCH_INIT' });
      const data = await onDelete(id);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      response.data = data;
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', error: err });
      response.error = err;
    }
    return response;
  };

  const useDelete = <TData>(onDelete: (id: number) => Promise<TData>): UseDeleteResult<TData> => {
    const initialState = {
      loading: false,
      data: null,
      error: undefined,
    };
    const [state, dispatch] = useReducer<Reducer<State<TData>, Action<TData>>>(
      fetchReducer,
      initialState,
    );
    return [
      state,
      (id: number): Promise<APIResponse<TData>> => deleteData(onDelete, id, dispatch),
    ];
  };

export default useDelete;