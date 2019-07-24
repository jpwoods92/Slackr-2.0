import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './util/RouteUtil';
import LoginForm from './components/session/LoginFormContainer';
import SignUpForm from './components/session/SignupFormContainer';
// import Root from './components/root';
const Router = () => (
  <Switch>
    {/* <ProtectedRoute path="/:app" component={Root} /> */}
    <AuthRoute path="/signUp" component={SignUpForm} />
    <AuthRoute path="/" component={LoginForm} />
  </Switch>
);

export default Router;
