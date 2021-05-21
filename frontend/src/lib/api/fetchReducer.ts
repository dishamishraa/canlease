import { Action, State } from './types';

const fetchReducer = <P>(state: State<P>, action: Action<P>): State<P> => {
  switch (action.type) {
    // The initial loading state
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    // We successfully received the data
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: undefined,
        data: action.payload,
      };
    // The fetch failed
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    /**
     * If we don't receive an expected action
     * we assume it's a developer mistake
     * and we will throw an error asking them
     * to fix that
     */
    default:
      throw new Error(
        `Unknown action type received 
        for dataFetchReducer.
        Please make sure you are passing
        one of the following actions:
          * FETCH_INIT
          * FETCH_SUCCESS
          * FETCH_FAILURE
          :`,
      );
  }
};

export default fetchReducer;
