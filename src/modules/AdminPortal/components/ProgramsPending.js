import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import compactObject from '../../../common/utilities/compactObject';
import { updateProgram, deleteProgram } from '../actions';
import {
  getProgramsQuery,
  updateProgramMutation,
  deleteProgramMutation
} from '../gql';
import { reject } from 'lodash';

import Loading from '../../../common/components/Loading';
import Error from '../../../common/components/Error';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import ClearIcon from 'grommet/components/icons/base/Clear';
import MenuIcon from 'grommet/components/icons/base/Menu';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Spinning from 'grommet/components/icons/Spinning';
import Button from 'grommet/components/Button';

const ProgramListItem = ({
  index,
  id,
  onClickApprove,
  onClickDisapprove,
  ...props
}) => (
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
    <Box direction="row">
      <Anchor
        onClick={() => {
          return onClickApprove({
            id,
            pending: false
          });
        }}
        icon={<CheckmarkIcon colorIndex="ok" />}
      />
      <Anchor
        onClick={() => {
          return onClickDisapprove({ id });
        }}
        icon={<ClearIcon colorIndex="critical" />}
      />
    </Box>
  </ListItem>
);

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

const ProgramsPending = props => (
  <Article pad="none" primary={true} full="vertical">
    <Header size="large" pad={{ horizontal: 'medium' }}>
      <Title responsive={false}>
        <Anchor icon={<MenuIcon />} onClick={props.toggleNavMenu} />
        <span>Programs Pending</span>
      </Title>
    </Header>
    <Section pad={{ horizontal: 'medium', between: 'small' }} flex={true}>
      {props.isFetching || props.isSettingVariables || props.isRefetching ? (
        <Loading />
      ) : props.programs && props.programs.length ? (
        <Box>
          <Paragraph margin="small">
            Showing {props.programs.length} out of {props.totalCount} programs
            (Pending)
          </Paragraph>
          <List>
            {props.programs.map(({ ...program }, index) => (
              <ProgramListItem
                index={index}
                key={program.id}
                match={props.match}
                onClickApprove={props.updateProgram}
                onClickDisapprove={props.deleteProgram}
                {...program}
              />
            ))}
          </List>
        </Box>
      ) : props.error ? (
        <Error message={props.error.message} onClick={props.refetchResults} />
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
              <Anchor onClick={props.refetchResults}>Click to refresh.</Anchor>
            </Paragraph>
          </Box>
        </Article>
      )}
    </Section>
    {props.programs &&
      props.programs.length < props.totalCount && (
        <LoadMore
          isFetchingMore={props.isFetchingMore}
          onClick={props.loadMorePrograms}
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

//
// Get Programs (Pending) Query
// ----------------------------------------
const PER_FETCH = 10;

const getPrograms_mapPropsToOptions = props => {
  return {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        filters: {
          pending: true
        }
      },
      skip: 0,
      first: PER_FETCH
    }
  };
};

const getPrograms_mapResultsToProps = ({ data }) => {
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
    refetchResults: ({ filters = {}, searchText = '' } = {}) =>
      data.refetch({ input: { filters, searchText } })
  };

  return compactObject(apolloData);
};

const getProgramsQueryConfig = {
  options: getPrograms_mapPropsToOptions,
  props: getPrograms_mapResultsToProps
};

//
// Update Program Mutation
// ----------------------------------------
const updateProgram_mapResultsToProps = ({ mutate, ownProps }) => {
  return {
    updateProgram: input => {
      return ownProps.actions.updateProgram(
        mutate({
          variables: {
            input
          },
          update: (proxy, { data: { updateProgram } }) => {
            //
            // Dynamically update all cached pending programs first
            // -----------------------------------------------------
            try {
              const allPendingPrograms = proxy.readQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: true
                    }
                  },
                  skip: 0,
                  first: 10
                }
              });
              const programs = reject(
                allPendingPrograms.programs,
                updateProgram
              );
              proxy.writeQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: true
                    }
                  },
                  skip: 0,
                  first: 10
                },
                data: {
                  programs,
                  _programsMeta: {
                    __typename: 'Meta',
                    totalCount: allPendingPrograms._programsMeta.totalCount - 1
                  }
                }
              });
            } catch (e) {
              console.log(
                'Program data not in cache. Erroring through proxy query.'
              );
            }
            //
            // Then, dynamically update the not pending cache to keep it in sync
            // ------------------------------------------------------------------
            try {
              const allNotPendingPrograms = proxy.readQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: false
                    }
                  },
                  skip: 0,
                  first: 10
                }
              });
              const programs = [
                ...allNotPendingPrograms.programs,
                updateProgram
              ];
              proxy.writeQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: false
                    }
                  },
                  skip: 0,
                  first: 10
                },
                data: {
                  programs,
                  _programsMeta: {
                    __typename: 'Meta',
                    totalCount:
                      allNotPendingPrograms._programsMeta.totalCount + 1
                  }
                }
              });
            } catch (e) {
              console.log(
                'Program data not in cache. Erroring through proxy query.'
              );
            }
          }
        })
      );
    }
  };
};

const updateProgramMutationConfig = {
  props: updateProgram_mapResultsToProps
};

//
// Delete Program Mutation
// ----------------------------------------
const deleteProgram_mapResultsToProps = ({ mutate, ownProps }) => {
  return {
    deleteProgram: ({ id }) => {
      return ownProps.actions.deleteProgram(
        mutate({
          variables: { id },
          update: (proxy, { data: { deleteProgram } }) => {
            try {
              const allPrograms = proxy.readQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: true
                    }
                  },
                  skip: 0,
                  first: 10
                }
              });
              const programs = reject(allPrograms.programs, deleteProgram);
              proxy.writeQuery({
                query: getProgramsQuery,
                variables: {
                  input: {
                    filters: {
                      pending: true
                    }
                  },
                  skip: 0,
                  first: 10
                },
                data: {
                  programs,
                  _programsMeta: {
                    __typename: 'Meta',
                    totalCount: allPrograms._programsMeta.totalCount - 1
                  }
                }
              });
            } catch (e) {
              console.log(
                'Program data not in cache. Erroring through proxy query.'
              );
            }
          }
        })
      );
    }
  };
};

const deleteProgramMutationConfig = {
  props: deleteProgram_mapResultsToProps
};

//
// Mutation Lifecycles with Redux
// ----------------------------------------
const mapStateToProps = ({
  programs: {
    update: {
      started: updateStarted,
      succeeded: updateSucceeded,
      errored: updateErrored,
      ended: updateEnded
    },
    delete: {
      started: deleteStarted,
      succeeded: deleteSucceeded,
      errored: deleteErrored,
      ended: deleteEnded
    }
  }
}) => {
  return compactObject({
    updateStarted,
    updateSucceeded,
    updateErrored,
    updateEnded,
    deleteStarted,
    deleteSucceeded,
    deleteErrored,
    deleteEnded
  });
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      updateProgram(fn) {
        dispatch(updateProgram(fn));
      },
      deleteProgram(fn) {
        dispatch(deleteProgram(fn));
      }
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(deleteProgramMutation, deleteProgramMutationConfig),
  graphql(updateProgramMutation, updateProgramMutationConfig),
  graphql(getProgramsQuery, getProgramsQueryConfig)
)(ProgramsPending);
