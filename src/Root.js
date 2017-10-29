import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import { history, setupStore, apolloClient } from './store.js';
import Loading from './common/components/Loading';
import App from './App';

const { store, persistor } = setupStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ApolloProvider client={apolloClient}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
