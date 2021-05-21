import React from 'react';
import { ApiError } from '../../lib/api/types';
import { redirectToLogin } from '../auth/api';

export type ErrorHandlerProps = {
    error: Error;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
    error,
}) => {
    if(error instanceof ApiError) {
        if(error.code === 401) {
            redirectToLogin();
            return <div>Loading...</div>;
        } 
    }

    return (
        <div>{error.message}</div>
    );
};

export default ErrorHandler;
