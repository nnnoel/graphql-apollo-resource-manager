import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import thunk from 'redux-thunk';
import _ from 'lodash';

const networkInterface = createNetworkInterface({
  uri: 'https://server-ivvvopzdti.now.sh/graphql'
});

export const apolloClient = new ApolloClient({
  networkInterface
});

const composeEnhancers = composeWithDevTools({});

export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const middlewares = [historyMiddleware, thunk, apolloClient.middleware()];

const combinedReducers = combineReducers({
  ...reducers,
  routerReducer,
  apollo: apolloClient.reducer()
});

export function setupStore(onStorePersisted) {
  const store = composeEnhancers(
    applyMiddleware(...middlewares),
    autoRehydrate()
  )(createStore)(combinedReducers);

  const persistConfig = {
    blacklist: ['apollo', 'createProgram', 'updateProgram', 'deleteProgram']
  };

  persistStore(store, persistConfig, () => {
    onStorePersisted();
  });

  const networkMiddleware = {
    applyMiddleware: (req, next) => {
      const { admin } = store.getState();
      const token = admin.token;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      req.options.headers = _.extend({}, req.options.headers, headers);
      next();
    }
  };
  networkInterface.use([networkMiddleware]);

  return store;
}

export default setupStore;
