import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'react-router-redux';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import createHistory from 'history/createBrowserHistory';
import { logoutAdmin } from './modules/AdminPortal/actions';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { some, includes } from 'lodash';

//
//  Setup new Apollo link
// ----------------------------
const apolloLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://server-ivvvopzdti.now.sh/graphql'
});

//
//  Persist jwt with redux
// ----------------------------------
const withAuthContext = setContext(() => {
  const { admin: { token } } = store.getState();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return { headers };
});

//
//  If jwt errors, log them out
// ---------------------------------
const errorLink = onError(({ graphQLErrors }) => {
  if (
    some(graphQLErrors, ({ originalError: { name } }) =>
      includes(['TokenExpiredError', 'JsonWebTokenError'], name)
    )
  ) {
    store.dispatch(logoutAdmin());
  }
});

const link = errorLink.concat(withAuthContext.concat(apolloLink));

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache
});

//
//  Router history with redux
// ------------------------------------
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const middlewares = [historyMiddleware, thunk];

//
//  Don't persist states of program mutation lifecycles
// ------------------------------------------------------------
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['programs']
};

const combinedReducers = persistCombineReducers(persistConfig, {
  ...reducers
});

let store;
export function setupStore() {
  store = createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default setupStore;
