import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import ErrorHandler from '../error/ErrorHandler';
import { AuthContext } from './AuthContext';

type ProtectedRouteProps = RouteProps & {
  adminRedirect?: string;
}

const CheckUserAccess: React.FC<ProtectedRouteProps> = (props) => {
  const authContext = useContext(AuthContext);
  const { profile, account, loading, error } = authContext;
  const userType = profile?.userType || 'customer';
  const  { adminRedirect } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!account) {
    return <Redirect to='/account' />;
  }

  if (adminRedirect && userType !== 'admin') {
    return <Redirect to={adminRedirect} />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  // if no errors then proceed to the route
  return <Route {...props} />;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => <CheckUserAccess {...props} />;

export default ProtectedRoute;
