import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import compactObject from '../../../common/utilities/compactObject';
import Loading from '../../../common/components/Loading';
import Error from '../../../common/components/Error';
import { reduce } from 'lodash';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import ResourcesIcon from 'grommet/components/icons/base/Resources';
import Title from 'grommet/components/Title';
import List from 'grommet/components/List';
import Spinning from 'grommet/components/icons/Spinning';
import Button from 'grommet/components/Button';

import Program from './Program';
import SelectDrop from './SelectDrop';

const LoadMore = ({ isFetchingMore, onClick }) => {
  return (
    <Box full={false} margin="small" align="center" justify="center">
      {isFetchingMore ? (
        <Spinning size="medium" />
      ) : (
        <Button
          style={{ padding: '.25em', fontSize: '1em' }}
          label="Load More"
          onClick={onClick}
        />
      )}
    </Box>
  );
};

class ProgramsListDirectory extends Component {
  state = {
    searchText: '',
    filters: {}
  };

  handleFilterChange = selection => {
    this.setState(
      prevState => {
        return {
          filters: {
            ...prevState.filters,
            ...selection
          }
        };
      },
      () => {
        const { searchText, filters } = this.state;
        this.props.refetchResults({ searchText, filters });
      }
    );
  };

  handleSearchQuery = e => {
    if (e.keyCode === 13) {
      const { searchText, filters } = this.state;
      this.props.refetchResults({ searchText, filters });
    }
  };

  handleReset = () => {
    this.setState({ filters: {}, searchText: '' }, () => {
      this.props.refetchResults();
    });
  };

  render() {
    return (
      <Article pad="none" full="vertical" direction="column">
        <Header
          direction="row"
          justify="between"
          size="large"
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <ResourcesIcon size="medium" />
          <Search
            id="programs-search-bar"
            style={{ fontSize: '1.5em' }}
            inline={true}
            responsive={false}
            fill={true}
            size="medium"
            placeHolder="Search for Programs"
            value={this.state.searchText}
            onDOMChange={e => this.setState({ searchText: e.target.value })}
            onKeyDown={this.handleSearchQuery}
          />
        </Header>

        <Section
          direction="row"
          pad={{ horizontal: 'small', between: 'small' }}
          flex={false}
        >
          <Title margin="small">Filter By:</Title>
          <Box flex={true} justify="start" direction="row">
            <Box pad="small" basis="small" flex={true}>
              <SelectDrop
                keyName="takesPlace"
                placeHolder="Online or in person?"
                options={[
                  { label: 'Online', value: 'online' },
                  { label: 'In Person', value: 'inperson' }
                ]}
                onChange={this.handleFilterChange}
                value={this.state.filters['takesPlace'] || ''}
              />
            </Box>
            <Box pad="small" basis="small" flex={true}>
              <SelectDrop
                keyName="timeOfDay"
                placeHolder="Time of day"
                options={[
                  { label: 'Days only', value: 'days' },
                  { label: 'Nights only', value: 'nights' },
                  { label: 'Weekends only', value: 'weekends' }
                ]}
                onChange={this.handleFilterChange}
                value={this.state.filters['timeOfDay'] || ''}
              />
            </Box>
            <Box pad="small" basis="small" flex={true}>
              <SelectDrop
                keyName="timeLength"
                placeHolder="Select length of time"
                options={[
                  {
                    label: 'Less than 6 months',
                    value: 'lt6'
                  },
                  {
                    label: 'More than 6 months',
                    value: 'gt6'
                  }
                ]}
                onChange={this.handleFilterChange}
                value={this.state.filters['timeLength'] || ''}
              />
            </Box>
            <Box pad="small" basis="small" flex={true}>
              <SelectDrop
                keyName="cost"
                placeHolder="Cost"
                options={[
                  { label: 'Free', value: 'free' },
                  { label: 'Less than $5000', value: 'lt5000' },
                  { label: 'More than $5000', value: 'gt5000' }
                ]}
                onChange={this.handleFilterChange}
                value={this.state.filters['cost'] || ''}
              />
            </Box>
            <Box pad="small" basis="small" flex={true}>
              <SelectDrop
                keyName="ageRange"
                placeHolder="Age range"
                options={[
                  { label: 'Child (<13)', value: 'child' },
                  { label: 'Teenager (13-19)', value: 'teen' },
                  { label: 'Older (20+)', value: 'older' }
                ]}
                onChange={this.handleFilterChange}
                value={this.state.filters['ageRange'] || ''}
              />
            </Box>
          </Box>
        </Section>
        <Section
          id="program-list-section"
          pad="medium"
          margin="small"
          flex={false}
        >
          {this.props.isFetching ||
          this.props.isSettingVariables ||
          this.props.isRefetching ? (
            <Loading />
          ) : this.props.programs && this.props.programs.length ? (
            <Box>
              <Paragraph id="program-list-count" margin="small">
                Showing {this.props.programs.length} out of{' '}
                {this.props.totalCount} programs
              </Paragraph>
              <List id="program-list">
                {this.props.programs.map(({ ...program }, index) => (
                  <Program
                    index={index}
                    key={program.id}
                    match={this.props.match}
                    {...program}
                  />
                ))}
              </List>
            </Box>
          ) : this.props.error ? (
            <Error
              message={this.props.error.message}
              onClick={this.handleReset}
            />
          ) : (
            <Article pad="none" full="vertical" direction="column">
              <Box
                flex={true}
                full={false}
                margin="small"
                align="center"
                justify="center"
              >
                <Paragraph margin="none">
                  There are no programs to show.{' '}
                  <Anchor onClick={this.handleReset}>Click to refresh.</Anchor>
                </Paragraph>
              </Box>
            </Article>
          )}
        </Section>
        {this.props.programs &&
          this.props.programs.length < this.props.totalCount && (
            <LoadMore
              isFetchingMore={this.props.isFetchingMore}
              onClick={this.props.loadMorePrograms}
            />
          )}
        <Box flex={true} />

        <Footer
          pad={{
            horizontal: 'medium',
            vertical: 'medium',
            between: 'medium'
          }}
          justify="between"
        >
          <Paragraph margin="none">© 2017 Noel Colon</Paragraph>
          <Box direction="row" align="center" pad={{ between: 'medium' }}>
            <Menu direction="row" size="small" dropAlign={{ right: 'right' }}>
              <Anchor path="/submit">Submit a Program</Anchor>
              <Anchor href="#">Contact</Anchor>
              <Anchor href="#">About</Anchor>
              <Anchor path="/admin">Admin Portal</Anchor>
            </Menu>
          </Box>
        </Footer>
      </Article>
    );
  }
}

export const getProgramsQuery = gql`
  query GetPrograms($input: GetProgramsInput, $first: Int!, $skip: Int!) {
    programs(input: $input, first: $first, skip: $skip) {
      id
      name
      description
      website
      contactName
      email
      phoneNumber
      cost
      size
      location
      county
      ageRange
      affiliations
      timeOfDay
      timeLength
      certification
      partners
      scholarships
      takesPlace
      measuredSuccess
      pastSuccess
      pending
    }
    _programsMeta(input: $input) {
      totalCount
    }
  }
`;

//
// Get Programs (Not Pending) Query
// ----------------------------------------
const PER_FETCH = 10;

const mapPropsToOptions = props => {
  return {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        filters: {
          pending: false
        }
      },
      skip: 0,
      first: PER_FETCH
    }
  };
};

// Pagination
const mapResultsToProps = ({ data }) => {
  // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-networkStatus
  const apolloData = {
    error: data.error,
    isFetching: data.loading && data.networkStatus === 1,
    isSettingVariables: data.loading && data.networkStatus === 2,
    isFetchingMore: data.loading && data.networkStatus === 3,
    isRefetching: data.loading && data.networkStatus === 4,
    programs: data.programs,
    totalCount: (data._programsMeta || {}).totalCount,
    loadMorePrograms() {
      data.fetchMore({
        variables: {
          skip: data.programs.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return Object.assign({}, previousResult, {
            programs: [...previousResult.programs, ...fetchMoreResult.programs]
          });
        }
      });
    },
    refetchResults: ({ filters = {}, searchText = '' } = {}) => {
      const newFilters = transformFilters(filters);
      data.refetch({
        input: {
          filters: {
            ...newFilters,
            pending: false
          },
          searchText
        }
      });
    }
  };

  return compactObject(apolloData);
};

const transformFilters = filters => {
  const newFilters = reduce(
    filters,
    (acc, val, key) => {
      if (typeof val === 'object') {
        acc[key] = val.value;
        return acc;
      }
      return acc;
    },
    {}
  );
  return newFilters;
};

const getProgramsQueryConfig = {
  options: mapPropsToOptions,
  props: mapResultsToProps
};

export default graphql(getProgramsQuery, getProgramsQueryConfig)(
  ProgramsListDirectory
);
