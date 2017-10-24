import React from 'react';
import 'grommet/grommet-hpe.min.css';
import GrommetApp from 'grommet/components/App';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProgramsListDirectory from './modules/ProgramsListDirectory/components/ListDirectory';
import AdminDashboard from './modules/AdminPortal/views/Dashboard';
import AdminLogin from './modules/AdminPortal/views/Login';
import { AdminRoute, GuestRoute } from './routes';

export default () => (
  <GrommetApp centered={false}>
    <Switch>
      <Route exact path="/" component={ProgramsListDirectory} />
      <Redirect exact from="/admin" to="/admin/login" />
      <GuestRoute exact path="/admin/login" component={AdminLogin} />
      <AdminRoute path="/admin/programs" component={AdminDashboard} />
    </Switch>
  </GrommetApp>
);
