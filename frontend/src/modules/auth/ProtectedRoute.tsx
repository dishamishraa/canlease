import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { IS_DEV } from '../../lib/config';
import ErrorHandler from '../error/ErrorHandler';
import { redirectToLogin } from './api';
import { AuthContext } from './AuthContext';
import { useServiceStatus } from './getServiceStatus';

const CheckUserAccess: React.FC<RouteProps> = (props) => {
  const authContext = useContext(AuthContext);
  const { user, loading: userLoading, error: userError } = authContext;
  const { loading, error } = useServiceStatus();

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirectToLogin();
    return <div>Loading...</div>;
  }

  if (userError) {
    return <ErrorHandler error={userError} />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return <Route {...props} />;
};

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  // for local development we don't check admin user session.
  if (IS_DEV) {
    return <Route {...props} />;
  }
  return <CheckUserAccess {...props} />;
};

export default ProtectedRoute;
