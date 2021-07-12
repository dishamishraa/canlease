import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import ErrorHandler from '../error/ErrorHandler';
import { AuthContext } from './AuthContext';

const CheckUserAccess: React.FC<RouteProps> = (props) => {
  const authContext = useContext(AuthContext);
  const { account, loading, error } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!account) {
    return <Redirect to='/account' />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  // if no errors then proceed to the route
  return <Route {...props} />;
};

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  return <CheckUserAccess {...props} />;
};

export default ProtectedRoute;
