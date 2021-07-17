import { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import { IS_DEV } from '../lib/config';

const DEFAULT_ERROR_RESPONSE_MESSAGE = 'Something went wrong';

const isHttpError = (error: Error | HttpError): error is HttpError => (
  (error as HttpError).status !== undefined
);

interface ErrorResponse {
  code: number;
  type: string;
  message: string;
}

const createErrorResponse = ({
  name: type,
  status: code,
  message,
}: HttpError): ErrorResponse => ({
  code,
  type,
  message,
});

/**
 * Handles responses to requests that raise an Error
 */
function errorResponse(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  const defaultError = new createError.InternalServerError(
    IS_DEV ? err.message : DEFAULT_ERROR_RESPONSE_MESSAGE,
  );
  const httpError = isHttpError(err) ? err : defaultError;

  return res.status(httpError.status).json(err || createErrorResponse(httpError));
}

export default errorResponse;
