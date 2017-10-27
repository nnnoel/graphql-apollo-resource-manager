import React from 'react';
import { render as renderToDOM } from 'react-dom';
import { MemoryRouter } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { mockNetworkInterface } from 'react-apollo/test-utils';
import { setupStore } from '../store';
import App from '../App';

describe('Resource Manager app', () => {
  it('should initially render the programs list directory', () => {
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
    const store = setupStore(jest.fn());

    renderToDOM(
      <ApolloProvider client={client} store={store}>
        <MemoryRouter initialEnties={['/']}>
          <App />
        </MemoryRouter>
      </ApolloProvider>,
      node
    );

    expect(node.innerHTML).toContain('Search for Programs');
    expect(node.innerHTML).toContain('<span>Filter By:</span>');
    expect(node.innerHTML).toContain('footer');
    expect(node.innerHTML).toContain('© 2017 Noel Colon');
  });
});
