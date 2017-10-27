import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Router } from 'react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { mockNetworkInterface } from 'react-apollo/test-utils';
import { setupStore } from '../store';
import { AdminRoute, GuestRoute } from '../routes';

describe('Routes', () => {
  const node = document.createElement('div');
  const client = new ApolloClient({
    networkInterface: mockNetworkInterface(
      ...[
        {
          request: jest.fn(),
          result: jest.fn()
        }
      ]
    )
  });
  let store = setupStore(jest.fn());
  let actual = null;
  const Component = props => (actual = props) && null;

  afterEach(() => {
    let actual = null;
    store = setupStore(jest.fn());
    ReactDOM.unmountComponentAtNode(node);
  });

  describe('AdminRoute', () => {
    it('should render path for authenticated admins', () => {
      store.dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: {
          signInAdmin: {
            isAuthenticated: true,
            token: 'someservervalidatedjwt'
          }
        }
      });
      const intendedPath = '/some/path/';
      const history = createMemoryHistory({ initialEntries: [intendedPath] });

      ReactDOM.render(
        <ApolloProvider client={client} store={store}>
          <Router history={history}>
            <AdminRoute path={intendedPath} component={Component} />
          </Router>
        </ApolloProvider>,
        node
      );

      expect(history.location.pathname).not.toEqual('/admin/login');
      expect(history.location.pathname).toEqual(intendedPath);
    });

    it('should redirect anyone unauthenticated to the admin login page', () => {
      const intendedPath = '/admin/related/path';
      const history = createMemoryHistory({ initialEntries: [intendedPath] });

      ReactDOM.render(
        <ApolloProvider client={client} store={store}>
          <Router history={history}>
            <AdminRoute path={intendedPath} component={Component} />
          </Router>
        </ApolloProvider>,
        node
      );
      expect(history.location.pathname).not.toEqual(intendedPath);
      expect(history.location.pathname).toEqual('/admin/login');
    });
  });

  describe('GuestRoute', () => {
    const intendedPath = '/path/to/login/portal';
    const history = createMemoryHistory({ initialEntries: [intendedPath] });

    it('should render the exact path for guests', () => {
      ReactDOM.render(
        <ApolloProvider client={client} store={store}>
          <Router history={history}>
            <GuestRoute exact path={intendedPath} component={Component} />
          </Router>
        </ApolloProvider>,
        node
      );
      expect(history.location.pathname).not.toEqual('/admin/programs/list');
      expect(history.location.pathname).toEqual(intendedPath);
    });

    it('should redirect authenticated admins to the dashboard list page', () => {
      store.dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: {
          signInAdmin: {
            isAuthenticated: true,
            token: 'someservervalidatedjwt'
          }
        }
      });

      ReactDOM.render(
        <ApolloProvider client={client} store={store}>
          <Router history={history}>
            <GuestRoute exact path={intendedPath} component={Component} />
          </Router>
        </ApolloProvider>,
        node
      );
      expect(history.location.pathname).not.toEqual(intendedPath);
      expect(history.location.pathname).toEqual('/admin/programs/list');
    });
  });
});
