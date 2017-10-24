import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
// import Toast from 'grommet/components/Toast';

import {
  MenuSidebar,
  ProgramsList,
  ProgramsPending,
  NewProgram,
  EditProgram
} from '../components';

class Dashboard extends Component {
  state = {
    showMenu: false
  };

  handleMenuToggle = () => {
    this.setState(({ showMenu }) => ({ showMenu: !showMenu }));
  };

  handleMenuClose = () => {
    this.setState(() => ({ showMenu: false }));
  };

  render() {
    return (
      <Split flex="right">
        <MenuSidebar
          closeNavMenu={this.handleMenuClose}
          showMenu={this.state.showMenu}
        />
        <Article>
          <Route
            exact
            path={`${this.props.match.url}/list`}
            render={props => (
              <ProgramsList {...props} toggleNavMenu={this.handleMenuToggle} />
            )}
          />
          <Route
            exact
            path={`${this.props.match.url}/list/:id`}
            render={props => (
              <EditProgram {...props} toggleNavMenu={this.handleMenuToggle} />
            )}
          />
          <Route
            exact
            path={`${this.props.match.url}/pending`}
            render={props => (
              <ProgramsPending
                {...props}
                toggleNavMenu={this.handleMenuToggle}
              />
            )}
          />
          <Route
            exact
            path={`${this.props.match.url}/new`}
            render={props => (
              <NewProgram {...props} toggleNavMenu={this.handleMenuToggle} />
            )}
          />
        </Article>
      </Split>
    );
  }
}

export default Dashboard;
