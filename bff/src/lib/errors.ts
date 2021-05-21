import createError, { HttpError, HttpErrorConstructor } from 'http-errors';

const CONFLICT_ERROR = 'Conflict';
const AUTHENTICATION_ERROR = 'Authentication Error';
const UNPROCESSABLE_ENTITY_ERROR = 'Invalid data';
const NOT_FOUND_ERROR = 'Not found';
const FORBIDDEN_ERROR = 'Forbidden';
const INTERNAL_SERVER_ERROR = 'Internal server error';
const BAD_REQUEST_ERROR = 'Bad Request';

type AppError = (message?: string) => HttpError;

const createAppError = (
  ErrorConstructor: HttpErrorConstructor,
  defaultMessage: string,
): AppError => (message: string = defaultMessage): HttpError => new ErrorConstructor(message);

export const NotFoundError = createAppError(createError.NotFound, NOT_FOUND_ERROR);
export const ForbiddenError = createAppError(createError.Forbidden, FORBIDDEN_ERROR);
export const ConflictError = createAppError(createError.Conflict, CONFLICT_ERROR);
export const UnauthorizedError = createAppError(createError.Unauthorized, AUTHENTICATION_ERROR);
export const BadRequestError = createAppError(createError.BadRequest, BAD_REQUEST_ERROR);
export const UnprocessableEntityError = createAppError(
  createError.UnprocessableEntity, UNPROCESSABLE_ENTITY_ERROR,
);
export const InternalServerError = createAppError(
  createError.InternalServerError, INTERNAL_SERVER_ERROR,
);

export const isAppError = (
  error: Error | HttpError,
  appError: AppError,
): boolean => error.name === appError().name;
