import React from 'react';
import { connect } from 'react-redux';
import { logoutAdmin } from '../actions';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import Sidebar from 'grommet/components/Sidebar';
import UserAdminIcon from 'grommet/components/icons/base/UserAdmin';
import Animate from 'grommet/components/Animate';

const MenuSidebar = ({ logoutAdmin, closeNavMenu, showMenu }) => (
  <Animate
    visible={showMenu}
    enter={{ animation: 'slide-right', duration: 300, delay: 0 }}
    leave={{ animation: 'slide-right', duration: 300, delay: 0 }}
  >
    <Sidebar colorIndex="neutral-1" fixed={true} style={{ overFlow: 'hidden' }}>
      <Header size="large" justify="between" pad={{ horizontal: 'medium' }}>
        <Title onClick={() => {}}>
          <UserAdminIcon colorIndex="light-1" />
          <span>Admin Dashboard</span>
        </Title>
        <Button icon={<CloseIcon />} onClick={closeNavMenu} plain={true} />
      </Header>
      <Menu fill={true} primary={true}>
        <Anchor path="/admin/programs/list">Programs</Anchor>
        <Anchor path="/admin/programs/pending">Pending</Anchor>
      </Menu>
      <Footer pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Anchor icon={<LogoutIcon />} onClick={logoutAdmin} label="Logout" />
      </Footer>
    </Sidebar>
  </Animate>
);

const mapDispatchToProps = dispatch => {
  return {
    logoutAdmin() {
      dispatch(logoutAdmin());
    }
  };
};

export default connect(null, mapDispatchToProps)(MenuSidebar);
