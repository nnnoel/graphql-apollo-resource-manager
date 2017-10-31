import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from '../App';

describe('Resource Manager app', () => {
  it('should initially render the programs list directory', () => {
    const client = new ApolloClient({
      link: createHttpLink({ uri: 'test' }),
      cache: new InMemoryCache()
    });
    const store = createStore(() => ({}));
    const wrapper = shallow(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </ApolloProvider>
      </Provider>
    );

    expect(wrapper.html()).toContain('Search for Programs');
    expect(wrapper.html()).toContain('<span>Filter By:</span>');
    expect(wrapper.html()).toContain('id="program-list-section"');
    expect(wrapper.html()).toContain('footer');
    expect(wrapper.html()).toContain('© 2017 Noel Colon');
  });
});
