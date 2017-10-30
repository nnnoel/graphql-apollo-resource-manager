import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import compactObject from '../../../common/utilities/compactObject';
import ProgramForm from '../../../common/components/ProgramForm';
import { createProgram } from '../actions';
import { getProgramsQuery, createProgramMutation } from '../gql';

import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Footer from 'grommet/components/Footer';

class NewProgram extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.createSucceeded) {
      nextProps.history.push('/admin/programs/list');
    }
  }

  render() {
    return (
      <Box tag="article" pad="none" primary={true} full="vertical">
        <Header size="large" pad={{ horizontal: 'medium' }}>
          <Title responsive={false}>
            <Anchor icon={<MenuIcon />} onClick={this.props.toggleNavMenu} />
            <span>New Program</span>
          </Title>
        </Header>

        <Box
          tag="section"
          align="center"
          pad={{ horizontal: 'medium', between: 'small' }}
          flex={true}
        >
          <ProgramForm
            buttonName="Create"
            onFormSubmit={this.props.createProgram}
            disabled={this.props.createStarted}
          />
        </Box>

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
      </Box>
    );
  }
}

const createProgram_mapResultsToProps = ({ mutate, ownProps }) => {
  return {
    createProgram: input => {
      return ownProps.actions.createProgram(
        mutate({
          variables: { input },
          update: (proxy, { data: { createProgram } }) => {
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
                  programs: [...allPrograms.programs, createProgram],
                  _programsMeta: {
                    __typename: 'Meta',
                    totalCount: allPrograms._programsMeta.totalCount + 1
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

const createProgramMutationConfig = {
  props: createProgram_mapResultsToProps
};

const mapStateToProps = ({
  programs: {
    create: {
      started: createStarted,
      succeeded: createSucceeded,
      errored: createErrored,
      ended: createEnded
    }
  }
}) => {
  return compactObject({
    createStarted,
    createSucceeded,
    createErrored,
    createEnded
  });
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      createProgram(fn) {
        dispatch(createProgram(fn));
      }
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(createProgramMutation, createProgramMutationConfig)
)(NewProgram);
