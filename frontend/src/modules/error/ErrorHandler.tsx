import React from 'react';
import { Redirect } from 'react-router-dom';
import { ApiError } from '../../lib/api/types';

export type ErrorHandlerProps = {
  error: Error;
};

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
}) => {
  if (error instanceof ApiError) {
    if (error.code === 401) {
      return <Redirect to='/account' />;
    }
  }

  return (
        <div>{error.message}</div>
  );
};

export default ErrorHandler;
