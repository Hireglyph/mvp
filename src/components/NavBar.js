/** @jsx jsx */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';

import logo from 'assets/images/logo.svg';

const NavBarSx = {
  backgroundColor: 'white',
  height: '60px',
  paddingTop: '0.7em',
  paddingLeft: '60px',
  paddingRight: '60px',
  fontFamily: 'Open-Sans',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',

  '.link': {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },

  '.nav-text': {
    color: 'mediumGrey',
    fontSize: '14px',
  },

  '.nav-logo': {
    height: '18px',
    marginBottom: '7px',
    '@media(max-width: 475px)': {
      height: '16px',
    },
  },

  '.red-dot': {
    position: 'absolute',
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    textAlign: 'center',
    color: 'orange',
    backgroundColor: 'red',
    marginLeft: '23px',
    bottom: '10px',
  },
};

class NavBar extends React.Component {
  navbarContent = () => {
    const { firebase, hasNotifs, uid } = this.props;

    // return nothing if uid/hasNotifs not loaded (only base navbar)
    if (!this.props.isLoaded || (uid && !isLoaded(hasNotifs))) {
      return;
    }

    // if not logged in: display login and register links
    if (!uid) {
      return (
        <React.Fragment>
          <Nav.Link as={Link} className="link" to='/register'>
            <div className="nav-text">
              Register
            </div>
          </Nav.Link>
          <Nav.Link as={Link} className="link" to='/login'>
            <div className="nav-text">
              Login
            </div>
          </Nav.Link>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Nav.Link as={Link} to='/notifications'>
          {/* display red dot on bell if user has notifs */}
          {hasNotifs && <div className="red-dot"></div>}
          <FontAwesomeIcon icon={faBell} size="2x" className="icon" />
        </Nav.Link>
        <NavDropdown
            title={
              <div>
                <div className="user-icon-bg"></div>
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="icon" />
              </div>
            }
            alignRight
          >
          <NavDropdown.Item
            as={Link}
            to="/profile/tp"
            className="link"
            style={{color: 'black'}}
          >
            Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          {/* redirect to landing page when user logs out*/}
          <NavDropdown.Item
            onClick={() => {
              this.props.history.push('/');
              firebase.logout();
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </React.Fragment>
    );
  };

  render() {
    // retrieve what should be displayed in the navbar
    const navbarContent = this.navbarContent();

    // base navbar: Hireglyph logo (home) and link to questions
    return (
      <Navbar collapseOnSelect expand="lg" sx={NavBarSx}>
        <Navbar.Brand>
          <Link to='/'>
            <img
              alt="Hireglyph"
              src={logo}
              style={{ height: '18px', marginBottom: '7px' }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="ml-auto">
            {navbarContent &&
              <Nav.Link as={Link} className="link" to='/questions'>
                <div className="nav-text">
                  Questions
                </div>
              </Nav.Link>}
            {navbarContent}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return { hasNotifs: state.firebase.data.hasNotifs };
};

export default compose(
  withRouter, // for this.props.history.push
  firebaseConnect(props =>
    props.uid
      ? [{ path: '/hasNotifs/' + props.uid, storeAs: 'hasNotifs' }]
      : []
  ),
  connect(mapStateToProps)
)(NavBar);
