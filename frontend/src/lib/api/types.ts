export type ServiceErrorResponse = {
  code: number;
  type: string;
  message: string;
};

export class ApiError extends Error {
  code: number;
  type: string;

  constructor(response: ServiceErrorResponse) {
    super(response.message);
    this.code = response.code;
    this.type = response.type;
  }

  static isApiError(error: unknown): error is ApiError {
    const maybeApiError = error as (Partial<ApiError> | undefined);
    return !!maybeApiError?.code && !!maybeApiError?.type && maybeApiError instanceof Error; 
  }
}

/**
 * @type {Action}
 * This type will represent the
 * action our reducer takes.
 * It has three params the action
 * `type`, the payload we expect
 *  to receive from the endpoint
 *  and the error message
 */

export type Action<P> =
  | { type: 'FETCH_INIT' }
  | {
    type: 'FETCH_SUCCESS';
    payload: P;
  }
  | {
    type: 'FETCH_FAILURE';
    error: Error;
  };

/**
 *
 * @type {State}
 * This type is the initial
 * state our reducer expects.
 * It hold all the possible
 * states our app can be in
 * durning the fetch.
 */

export type State<P> = {
  loading: boolean;
  data: null | P;
  error: undefined | Error;
};

export type APIResponse<T> = { data: T | null; error?: Error };
