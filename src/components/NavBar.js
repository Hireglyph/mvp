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
  backgroundColor: 'orange',
  height: '62px',
  paddingTop: '0.8em',
  paddingLeft: '2em',
  paddingRight: '2em',
  fontFamily: 'Open-Sans',
  position: 'sticky',
  top: 0,
  zIndex: 10,

  '.link': {
    textDecoration: 'none',
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

  '.icon': {
    color: 'background',
    marginLeft: '7px',
    '&:hover': {
      color: 'darkBackground',
    }
  },

  '.user-icon-bg': {
    position: 'absolute',
    height: '26px',
    width: '26px',
    borderRadius: '50%',
    backgroundColor: 'black',
    marginLeft: '11px',
    bottom: '11px',
    zIndex: '-1',
  },

  '.nav-text': {
    color: 'black',
    marginTop: '5px',
    marginRight: '20px',
    fontSize: '18px',
    '&:hover': {
      textDecoration: 'underline',
    }
  },

  '.dropdown-toggle::after': {
    display: 'none',
  },

  '.dropdown-item.active, .dropdown-item:active': {
    color: 'black',
    backgroundColor: 'orange',
  },
};

class NavBar extends React.Component {
  navbarContent = () => {
    const { firebase, hasNotifs, uid } = this.props;

    if (!this.props.isLoaded || (uid && !isLoaded(hasNotifs))) {
      return;
    }
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
          <NavDropdown.Item>
            <Link to="/profile/tp" className="link" style={{color: 'black'}}>
              <div>Profile</div>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <div
              onClick={() => {
                this.props.history.push('/');
                firebase.logout();
              }}
            >
              Logout
            </div>
          </NavDropdown.Item>
        </NavDropdown>
      </React.Fragment>
    );
  };

  render() {
    const navbarContent = this.navbarContent();

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
  withRouter,
  firebaseConnect(props =>
    props.uid
      ? [{ path: '/hasNotifs/' + props.uid, storeAs: 'hasNotifs' }]
      : []
  ),
  connect(mapStateToProps)
)(NavBar);
