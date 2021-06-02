import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  RouteProps,
  Route,
} from 'react-router-dom';
import { IS_DEV } from './lib/config';
import { AuthContext, useServiceStatus } from './modules/auth';
import { redirectToLogin } from './modules/auth/api';
import ErrorHandler from './modules/error/ErrorHandler';

const routes = {
  home: '/',
  invalid: '/',
};

const InvalidRoute: React.FC<RouteProps> = () => <Redirect to={routes.home} />;

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

const App: React.FC<{}> = () => (
    <Router>
      <Switch>
        <ProtectedRoute exact path={routes.home}>
          <div>Hello World!</div>
        </ProtectedRoute>
        <InvalidRoute path={routes.invalid} />
      </Switch>
    </Router>
);

export default App;
