import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Auth = ({ component: Component, loggedIn, ...rest }) => {
  function toRender(props) {
    if (!loggedIn) {
      return <Component {...props} />;
    }
    return <Redirect to="/channels" />;
  }
  return <Route render={toRender} {...rest} />;
};

const Protected = ({ component: Component, loggedIn, render, ...rest }) => {
  function toRender(props) {
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    return <Component {...props} />;
  }

  if (loggedIn && render) {
    return <Route {...rest} render={render} />;
  }

  return <Route {...rest} render={toRender} />;
};

const mapStateToProps = () => {
  const token = sessionStorage.getItem('token');
  return {
    loggedIn: Boolean(token),
  };
};

Auth.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
Protected.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Object)]),
  render: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
};

Protected.defaultProps = {
  component: null,
  render: null,
};

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);
