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
  
  '.nav-link-clicked': {
    color: '#5A3FFF !important',
    borderBottom: '5px solid #5A3FFF',
  },
  
  '.nav-logo': {
    height: '18px',
    marginBottom: '2px',
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
  componentDidMount() {
    this.updateLinkStyle();
  };
  
  componentDidUpdate() {
    this.updateLinkStyle();
  };
 
  //changes link styling based on path
  updateLinkStyle = () => {
    const path = this.props.location.pathname;
    let p = path.substring(1);
    if (p.includes('/')) p = p.substring(0, p.indexOf('/'));
  
    let link = document.querySelector(`#${p}-nav-link`);
    let links = ['questions', 'howto', 'register', 'login'];
    if (link) {
      link.classList.add('nav-link-clicked');
      for (let i = 0; i < links.length; i++) {
        if (p !== links[i]) {
          let link2 = document.querySelector(`#${links[i]}-nav-link`);
          if (link2) link2.classList.remove('nav-link-clicked');
        }
      }
    } else {
      for (let i = 0; i < links.length; i++) {
        let link2 = document.querySelector(`#${links[i]}-nav-link`);
        if (link2) link2.classList.remove('nav-link-clicked');
      }
    }
  };
  
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
          <div className="nav-link-container">
            <Nav.Link as={Link} className="nav-link" id="register-nav-link" to='/register'>
              <div>
                Register
              </div>
            </Nav.Link>
            <Nav.Link as={Link} className="nav-link" id="login-nav-link" to='/login'>
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
            className="nav-link"
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
              className="nav-logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="ml-auto">
            {navbarContent &&
              <div className="nav-link-container">
                <Nav.Link as={Link} className="nav-link" id="questions-nav-link" to='/questions'>
                  <div>
                    Problems
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" id="howto-nav-link" to='/howto'>
                  <div>
                    How to
                  </div>
                </Nav.Link>
              </div>}
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