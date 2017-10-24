import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const renderAdminRoute = (props, params) => {
  const { component: Component, admin } = params;

  if (!admin.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/admin/login',
          state: { from: props.location }
        }}
      />
    );
  }

  return <Component {...props} />;
};

const renderGuestRoute = (props, params) => {
  const { component: Component, admin } = params;

  if (admin.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/admin/programs/list'
        }}
      />
    );
  }

  return <Component {...props} />;
};

let AdminRoute = ({ component: Component, admin, ...rest }) => {
  let params = { component: Component, admin, ...rest };
  return <Route {...rest} render={props => renderAdminRoute(props, params)} />;
};

let GuestRoute = ({ component: Component, admin, ...rest }) => {
  let params = { component: Component, admin, ...rest };
  return <Route {...rest} render={props => renderGuestRoute(props, params)} />;
};

const mapAdminToProps = ({ admin }) => ({ admin });

AdminRoute = connect(mapAdminToProps)(AdminRoute);
GuestRoute = connect(mapAdminToProps)(GuestRoute);

export { GuestRoute, AdminRoute };
