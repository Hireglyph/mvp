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

    if (!this.props.isLoaded || (uid && !isLoaded(hasNotifs))) {
      // return nothing if uid/hasNotifs not loaded (only base navbar)
      return;
    }
    if (!uid) {
      // if no uid: display login and register links
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
      /* if uid: display notifications link and profile circle
      profile circle: either go to profile page, or log out */
      <React.Fragment>
        <Nav.Link as={Link} to='/notifications'>
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
          {/* go to '/' aka landing page when user logs out*/}
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
    const navbarContent = this.navbarContent();

    return (
      // base navbar: Hireglyph logo (home) and link to questions
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
  //pull user's hasNotifs (red button on notifs link if hasNotifs===true)
  withRouter,
  firebaseConnect(props =>
    props.uid
      ? [{ path: '/hasNotifs/' + props.uid, storeAs: 'hasNotifs' }]
      : []
  ),
  connect(mapStateToProps)
)(NavBar);
