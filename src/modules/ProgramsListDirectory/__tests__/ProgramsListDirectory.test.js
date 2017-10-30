import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';
import { ApolloProvider } from 'react-apollo';
import { mockNetworkInterface } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { setupStore } from '../../../store';
import ListDirectory, { getProgramsQuery } from '../components/ListDirectory';
import { generateRandomMockData } from '../__mocks__/data';

// TODO: Test search, filters, and lazy loading
// FIXME since migrating apollo to 2.0

const setupMockInterface = (mocks, { component: Component }) => {
  const networkInterface = mockNetworkInterface(...mocks);
  const client = new ApolloClient({
    networkInterface,
    addTypename: false
  });
  const store = setupStore(jest.fn());
  const wrapper = mount(
    <ApolloProvider client={client} store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Component />
      </MemoryRouter>
    </ApolloProvider>
  );

  return { wrapper, store };
};

describe('ProgramsListDirectory feature', () => {
  describe('ListDirectory component', () => {
    let mockProgramList;
    let wrapper;
    let expectedData;
    let mock;
    beforeEach(() => {
      mockProgramList = generateRandomMockData();
      expectedData = {
        programs: mockProgramList,
        _programsMeta: {
          totalCount: mockProgramList.length
        }
      };

      mock = {
        request: {
          query: getProgramsQuery,
          variables: {}
        },
        result: { data: expectedData }
      };

      const { wrapper: compWrapper } = setupMockInterface([mock], {
        component: ListDirectory
      });
      wrapper = compWrapper;
    });
    afterEach(() => {
      mockProgramList = null;
      expectedData = null;
      wrapper = null;
      mock = null;
    });
    it('imports fine', () => {
      expect(ListDirectory).toBeTruthy();
    });

    it('mounts without problems', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('shows a loading spinner when data is not yet present', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.program-list-item')).toHaveLength(0);
      expect(wrapper.find('#program-list-count').exists()).toBe(false);
      expect(wrapper.find('#loading-spinner').exists()).toBe(true);
    });

    it('renders a list of data after query resolves', async () => {
      const waitForList = createWaitForElement('#program-list-section');
      await waitForList(wrapper);
      wrapper.update();

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#loading-spinner').exists()).toBe(false);
      expect(
        wrapper
          .find('#program-list')
          .last()
          .children()
      ).toHaveLength(mockProgramList.length);
    });

    it('shows an accurate total count of queried data', async () => {
      const waitForList = createWaitForElement('#program-list-section');
      await waitForList(wrapper);
      wrapper.update();

      expect(wrapper.exists()).toBe(true);
      expect(
        wrapper
          .find('#program-list-count')
          .children()
          .text()
      ).toEqual(
        `Showing ${mockProgramList.length} out of ${mockProgramList.length} programs`
      );
    });

    it('displays an error in the UI if the data failed to fetch through the network', async () => {
      mock.result = { error: new Error() };

      const { wrapper: compWrapper } = setupMockInterface([mock], {
        component: ListDirectory
      });
      wrapper = compWrapper;

      const waitForList = createWaitForElement('#program-list-section');
      await waitForList(wrapper);
      wrapper.update();

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#loading-spinner').exists()).toBe(false);
      expect(
        wrapper
          .find('#program-list')
          .last()
          .children()
      ).toHaveLength(0);
      expect(wrapper.find('#error-display').exists()).toBe(true);
    });
  });
});
