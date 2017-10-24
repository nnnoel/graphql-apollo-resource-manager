import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compactObject from '../../../common/utilities/compactObject';
import Loading from '../../../common/components/Loading';
import Error from '../../../common/components/Error';
import { getProgramsQuery } from '../gql';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Spinning from 'grommet/components/icons/Spinning';
import Button from 'grommet/components/Button';

const ProgramListItem = ({ index, id, match, ...props }) => {
  return (
    <ListItem
      separator={index === 0 ? 'horizontal' : 'bottom'}
      direction="row"
      align="center"
      justify="between"
      responsive={false}
      pad={{
        horizontal: 'medium',
        vertical: 'small',
        between: 'medium'
      }}
      key={id}
      index={index}
    >
      <Title>{props.name}</Title>
      <Anchor icon={<EditIcon />} path={`${match.url}/${id}`} />
    </ListItem>
  );
};

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

class ProgramsList extends Component {
  state = {
    searchText: ''
  };

  onSearchQuery = e => {
    if (e.keyCode === 13) {
      const { searchText } = this.state;
      this.props.refetchResults({ searchText });
    }
  };

  render() {
    return (
      <Article pad="none" primary={true} full="vertical">
        <Header size="large" pad={{ horizontal: 'medium' }}>
          <Title responsive={false}>
            <Anchor icon={<MenuIcon />} onClick={this.props.toggleNavMenu} />
            <span>Programs List</span>
          </Title>
          <Search
            style={{ fontSize: '1.5em' }}
            inline={true}
            fill={true}
            size="medium"
            placeHolder="Search"
            value={this.state.searchText}
            onDOMChange={e => this.setState({ searchText: e.target.value })}
            onKeyDown={this.onSearchQuery}
          />
          <Anchor icon={<AddIcon />} path="/admin/programs/new" />
        </Header>

        <Section pad={{ horizontal: 'medium', between: 'small' }} flex={true}>
          {this.props.isFetching ||
          this.props.isSettingVariables ||
          this.props.isRefetching ? (
            <Loading />
          ) : this.props.programs && this.props.programs.length ? (
            <Box>
              <Paragraph margin="small">
                Showing {this.props.programs.length} out of{' '}
                {this.props.totalCount} programs (Not pending)
              </Paragraph>
              <List>
                {this.props.programs.map(({ ...program }, index) => (
                  <ProgramListItem
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
              onClick={this.props.refetchResults}
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
                  <Anchor onClick={this.props.refetchResults}>
                    Click to refresh.
                  </Anchor>
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
        <Footer
          pad={{
            horizontal: 'medium',
            vertical: 'medium',
            between: 'medium'
          }}
          justify="between"
        >
          <Paragraph margin="none">© 2017 Noel Colon</Paragraph>
          <Box />
        </Footer>
      </Article>
    );
  }
}

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
    refetchResults: ({ searchText = '' } = {}) =>
      data.refetch({
        input: {
          filters: {
            pending: false
          },
          searchText
        }
      })
  };

  return compactObject(apolloData);
};

const getProgramsQueryConfig = {
  options: mapPropsToOptions,
  props: mapResultsToProps
};

export default graphql(getProgramsQuery, getProgramsQueryConfig)(ProgramsList);
