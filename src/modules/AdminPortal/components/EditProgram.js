import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import compactObject from '../../../common/utilities/compactObject';
import ProgramForm from '../../../common/components/ProgramForm';
import { updateProgram, deleteProgram } from '../actions';
import {
  getProgramsQuery,
  getProgramQuery,
  updateProgramMutation,
  deleteProgramMutation
} from '../gql';
import { reject } from 'lodash';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Footer from 'grommet/components/Footer';

import Loading from '../../../common/components/Loading';
import Error from '../../../common/components/Error';

class EditProgram extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateSucceeded || nextProps.deleteSucceeded) {
      nextProps.history.push('/admin/programs/list');
    }
  }

  render() {
    return (
      <Article pad="none" primary={true} full="vertical">
        <Header size="large" pad={{ horizontal: 'medium' }}>
          <Title responsive={false}>
            <Anchor icon={<MenuIcon />} onClick={this.props.toggleNavMenu} />
            <span>Edit Program</span>
          </Title>
        </Header>

        <Section
          align="center"
          pad={{ horizontal: 'medium', between: 'small' }}
          flex={true}
        >
          {this.props.programLoading && <Loading />}
          {this.props.programError && (
            <Error
              message={this.props.programError.message}
              onClick={() => {}}
            />
          )}
          {this.props.program && (
            <ProgramForm
              buttonName="Update"
              formBody={this.props.program}
              onFormSubmit={this.props.updateProgram}
              disabled={this.props.updateStarted}
              onFormDelete={this.props.deleteProgram}
            />
          )}
        </Section>
        <Footer
          pad={{
            horizontal: 'medium',
            vertical: 'medium',
            between: 'medium'
          }}
          justify="between"
        >
          <Paragraph margin="none">© 2017 Noel Colon</Paragraph>
        </Footer>
      </Article>
    );
  }
}

//
// Get Program Query
// ----------------------------------------
const getProgram_mapPropsToOptions = ({ match }) => {
  return {
    variables: {
      id: match.params.id
    }
  };
};

const getProgram_mapResultsToProps = ({
  data: { loading, error, program }
}) => {
  const apolloData = {
    programLoading: loading,
    programError: error,
    program
  };
  return compactObject(apolloData);
};

const getProgramQueryConfig = {
  skip: ({ match }) => !match.params.id,
  options: getProgram_mapPropsToOptions,
  props: getProgram_mapResultsToProps
};

//
// Update Program Mutation
// ----------------------------------------
const updateProgram_mapResultsToProps = ({ mutate, ownProps }) => {
  return {
    updateProgram: inputs => {
      const { __typename, ...rest } = inputs;

      return ownProps.actions.updateProgram(
        mutate({
          variables: {
            input: rest
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
                      pending: false
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
  graphql(getProgramQuery, getProgramQueryConfig)
)(EditProgram);
