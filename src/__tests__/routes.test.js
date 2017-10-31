import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setupStore } from '../store';
import { AdminRoute, GuestRoute } from '../routes';

describe('Routes', () => {
  const node = document.createElement('div');
  const client = new ApolloClient({
    link: createHttpLink({ uri: 'test' }),
    cache: new InMemoryCache()
  });
  let { store } = setupStore();
  const Component = () => null;

  beforeEach(() => {
    let { store: newStore } = setupStore();
    store = newStore;
  });
  afterEach(() => {
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
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Router history={history}>
              <AdminRoute path={intendedPath} component={Component} />
            </Router>
          </ApolloProvider>
        </Provider>,
        node
      );

      expect(history.location.pathname).not.toEqual('/admin/login');
      expect(history.location.pathname).toEqual(intendedPath);
    });

    it('should redirect anyone unauthenticated to the admin login page', () => {
      const intendedPath = '/admin/related/path';
      const history = createMemoryHistory({ initialEntries: [intendedPath] });

      ReactDOM.render(
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Router history={history}>
              <AdminRoute path={intendedPath} component={Component} />
            </Router>
          </ApolloProvider>
        </Provider>,
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
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Router history={history}>
              <GuestRoute path={intendedPath} component={Component} />
            </Router>
          </ApolloProvider>
        </Provider>,
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
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Router history={history}>
              <GuestRoute path={intendedPath} component={Component} />
            </Router>
          </ApolloProvider>
        </Provider>,
        node
      );
      expect(history.location.pathname).not.toEqual(intendedPath);
      expect(history.location.pathname).toEqual('/admin/programs/list');
    });
  });
});
