import {
  useReducer, Reducer, Dispatch,
} from 'react';
import { State, Action, APIResponse } from './types';
import fetchReducer from './fetchReducer';

export type UsePostResult<TData, TPayload> = [
  State<TData>,
  (payload: TPayload) => Promise<APIResponse<TData>>,
];

const postData = async <TData, TPayload>(
  post: (payload: TPayload) => Promise<TData>,
  payload: TPayload,
  dispatch: Dispatch<Action<TData>>,
): Promise<APIResponse<TData>> => {
  const response: APIResponse<TData> = {
    data: null,
    error: undefined,
  };
  try {
    dispatch({ type: 'FETCH_INIT' });
    const data = await post(payload);
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
    response.data = data;
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', error });
    response.error = error;
  }
  return response;
};

const usePost = <TData, TPayload = TData>(
  post: (payload: TPayload) => Promise<TData>,
): UsePostResult<TData, TPayload> => {
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
    (
      payload: TPayload,
    ): Promise<APIResponse<TData>> => postData(post, payload, dispatch),
  ];
};

export default usePost;
