import React, { Component } from 'react';
import { render as renderToDOM } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js';
import { history, setupStore, apolloClient } from './store.js';
import Loading from './common/components/Loading';

import App from './App';

class Root extends Component {
  state = {
    isLoading: true,
    store: setupStore(this.onStorePersisted.bind(this)) // Mostly for persisted admin authentication.
  };

  onStorePersisted() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, store } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <ApolloProvider store={store} client={apolloClient}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}

renderToDOM(<Root />, document.getElementById('root'));
