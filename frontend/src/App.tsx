import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  RouteProps,
  Route,
} from 'react-router-dom';
import styles from './App.module.scss';
import InstantQuoteLayout from './components/layout/InstantQuoteLayout';
import AuthLayout from './components/layout/AuthLayout';
import PortalLayout from './components/layout/PortalLayout';
import { ProtectedRoute } from './modules/auth';

export const routes = {
  home: '/',
  login: '/account',
  portal: '/portal',
  invalid: '/',
};

const InvalidRoute: React.FC<RouteProps> = () => <Redirect to={routes.home} />;

const App: React.FC<{}> = () => {
  const props: any = {
    className: styles.layout,
  };

  return (
    <Router>
      <Switch>
        <Route path={routes.login}>
          <AuthLayout {...props} />
        </Route>
        <ProtectedRoute path={routes.portal}>
          <PortalLayout {...props} />
        </ProtectedRoute>
        <Route path={routes.home}>
          <InstantQuoteLayout {...props} />
        </Route>
        <InvalidRoute path={routes.invalid} />
      </Switch>
    </Router>
  );
};

export default App;
