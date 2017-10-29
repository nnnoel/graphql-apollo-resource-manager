import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { LocalForm } from 'react-redux-form';
import TextInput from '../../../common/components/TextInput';
import { required, minLength } from '../../../common/formValidators';
import { loginAdmin } from '../actions';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

class LoginForm extends Component {
  handleSubmit = values => {
    this.props.loginAdmin(values);
  };

  render() {
    return (
      <LocalForm onSubmit={this.handleSubmit}>
        <TextInput
          id="username"
          label="Username"
          model=".username"
          validators={{
            required
          }}
          messages={{
            required: 'Required field.'
          }}
        />
        <br />
        <TextInput
          type="password"
          id="password"
          label="Password"
          model=".password"
          validators={{
            required,
            minLength: minLength(5)
          }}
          messages={{
            required: 'Required field.',
            minLength: 'Should have at least 5 characters'
          }}
        />
        <br />
        <Footer
          pad={{
            horizontal: 'medium',
            vertical: 'medium',
            between: 'medium'
          }}
          justify="center"
        >
          <Button type="submit" primary={true} label="Login" />
          {this.props.error && <div>{this.props.error}</div>}
        </Footer>
      </LocalForm>
    );
  }
}

const mapStoreToProps = ({ admin: { isAuthenticated, token, error } }) => {
  console.log({ isAuthenticated, token, error });
  if (error) {
    return {
      error: 'Invalid Login'
    };
  }
  return {
    isAuthenticated,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loginAdmin(fn) {
        dispatch(loginAdmin(fn));
      }
    }
  };
};

const adminLoginMutation = gql`
  mutation SignInAdmin($username: String!, $password: String!) {
    signInAdmin(username: $username, password: $password) {
      token
      isAuthenticated
    }
  }
`;

const adminLoginConfig = {
  props: ({ ownProps, mutate }) => {
    return {
      loginAdmin: input => {
        return ownProps.actions.loginAdmin(
          mutate({
            variables: input
          })
        );
      }
    };
  }
};

export default compose(
  connect(mapStoreToProps, mapDispatchToProps),
  graphql(adminLoginMutation, adminLoginConfig)
)(LoginForm);
