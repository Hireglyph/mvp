/** @jsx jsx */
 
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
 
import logo from 'assets/images/logo.svg';
 
const NavBarSx = {
  backgroundColor: 'white',
  height: '60px',
  padding: '0px 60px',
  fontFamily: 'Open-Sans',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
 
  '.ml-auto': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.nav-logo': {
    height: '18px',
    marginBottom: '2px',
    '@media(max-width: 475px)': {
      height: '16px',
    },
  },
  
  '.nav-link-container': {
    width: 'fit-content',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  '.nav-link': {
    width: '75px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15px',
    borderBottom: '5px solid white',
    fontSize: '15px',
    transition: '.5s ease',
    textDecoration: 'none',
  },

  '.nav-link-drop': {
    fontSize: '15px',
    transition: '.5s ease',
    textDecoration: 'none',
    padding: '5px 15px',
    margin: '0px',
  },
  
  '.nav-link-clicked': {
    color: '#5A3FFF !important',
    borderBottom: '5px solid #5A3FFF',
    '@media (max-width: 640px)': {
      border: 'none',
    }
  },

  '#nav-icon-container': {
    width: '50px',
    justifyContent: 'center',
    marginRight: '20px',
  },

  '.icon': {
    fontSize: '25px',
    color: 'mediumGray',
  },
  
  '.red-dot': {
    position: 'absolute',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'red',
    margin: '12px 0 0 18px',
  },

  '.collapse': {
    '@media (max-width: 640px)': {
      display: 'none',
    }
  },

  '.expand': {
    marginRight: '0px',
    marginLeft: 'auto',
    '@media (min-width: 641px)': {
      display: 'none',
    }
  },

  '.faBars': {
    color: 'black',
    '&:active': {
      color: 'black',
    },
    '&:focus': {
      color: 'black',
    },
    '&:active:focus': {
      color: 'black',
    },
  },

  '.toggle': {
    color: 'black',
    width: '50px',
    backgroundColor: 'white !important',
    border: '0 !important',
    '&:active': {
      backgroundColor: 'white !important',
      boxShadow: 'none !important',
    },
    '&:focus': {
      backgroundColor: 'white !important',
      boxShadow: 'none !important',
    },
  },

  '.dropdown-menu': {
    right: '0',
    left: 'auto',
  },

  '.dropdown-toggle-item': {
    '&:active': {
      backgroundColor: '#5A3FFF !important',
    },
  },

};
  
class NavBar extends React.Component {
  navbarContent = () => {
    const { firebase, hasNotifs, uid } = this.props;
    const path = this.props.location.pathname.split('/')[1];
  
    // return nothing if uid/hasNotifs not loaded (only base navbar)
    if (!this.props.isLoaded || (uid && !isLoaded(hasNotifs))) {
      return;
    }
  
    // if not logged in: display login and register links
    if (!uid) {
      return (
        <React.Fragment>
          <div className="nav-link-container">
            <Nav.Link
              as={Link}
              className={"nav-link " + ((path === 'register') && "nav-link-clicked")}
              to='/register'
            >
              <div>
                Register
              </div>
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={"nav-link " + ((path === 'login') && "nav-link-clicked")}
              to='/login'
            >
              <div>
                Login
              </div>
            </Nav.Link>
          </div>
        </React.Fragment>
      );
    }
  
    return (
      <React.Fragment>
        <div className="nav-link-container" id="nav-icon-container">
          <Nav.Link as={Link} to='/notifications'>
            {/* display red dot on bell if user has notifs */}
            {hasNotifs && <div className="red-dot"></div>}
            <FontAwesomeIcon icon={faBell} className="icon" />
          </Nav.Link>
          <NavDropdown
              title={
                <div>
                  <div className="user-icon-bg"></div>
                  <FontAwesomeIcon icon={faUserCircle} className="icon" />
                </div>
              }
              alignRight
            >
            <NavDropdown.Item
              as={Link}
              to="/profile/tp"
              className="nav-link-drop"
              style={{color: 'black'}}
            >
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {/* redirect to landing page when user logs out*/}
            <NavDropdown.Item
              className="nav-link-drop"
              onClick={() => {
                this.props.history.push('/');
                firebase.logout();
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </React.Fragment>
    );
  };

  dropdown = () => {
    const { firebase, uid } = this.props;
    const path = this.props.location.pathname.split('/')[1];
    if (!uid) {
      return (
        <Dropdown>
          <Dropdown.Toggle className="toggle" variant="success" id="dropdown-basic">
            <FontAwesomeIcon className="faBars" icon={faBars} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to='/questions'
              className={"dropdown-toggle-item " + ((path === 'questions') && "nav-link-clicked")}
            >
              Problems
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='/about'
              className={"dropdown-toggle-item " + ((path === 'about') && "nav-link-clicked")}
            >
              About Us
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='/login'
              className={"dropdown-toggle-item " + ((path === 'login') && "nav-link-clicked")}
            >
              Login
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='/register'
              className={"dropdown-toggle-item " + ((path === 'register') && "nav-link-clicked")}
            >
              Register
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <Dropdown>
        <Dropdown.Toggle className="toggle" variant="success" id="dropdown-basic">
          <FontAwesomeIcon className="faBars" icon={faBars} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/questions'
            className={"dropdown-toggle-item " + ((path === 'questions') && "nav-link-clicked")}
          >
            Problems
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to='/about'
            className={"dropdown-toggle-item " + ((path === 'about') && "nav-link-clicked")}
          >
            About Us
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to='/notifications'
            className={"dropdown-toggle-item " + ((path === 'notifications') && "nav-link-clicked")}
          >
            Notifications
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to='/profile/tp'
            className={"dropdown-toggle-item " + ((path === 'profile') && "nav-link-clicked")}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-toggle-item"
            onClick={() => {
              this.props.history.push('/');
              firebase.logout();
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  
  render() {
    // retrieve what should be displayed in the navbar
    const navbarContent = this.navbarContent();
    const dropdown = this.dropdown();

    const path = this.props.location.pathname.split('/')[1];
  
    // base navbar: Hireglyph logo (home) and link to questions
    console.log(!navbarContent);
    return (
      <Navbar sx={NavBarSx}>
        <Navbar.Brand>
          <Link to='/'>
            <img
              alt="Hireglyph"
              src={logo}
              className="nav-logo"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto collapse">
          {navbarContent &&
            <div className="nav-link-container">
              <Nav.Link
                as={Link}
                className={"nav-link " + ((path === 'questions') && "nav-link-clicked")}
                to='/questions'
              >
                <div>
                  Problems
                </div>
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={"nav-link " + ((path === 'about') && "nav-link-clicked")}
                to='/about'
              >
                <div>
                  About
                </div>
              </Nav.Link>
            </div>}
          {navbarContent}
        </Nav>
        <Nav className="expand">
          {dropdown}
        </Nav>
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
