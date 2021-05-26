/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';
import { Navbar, Nav } from 'react-bootstrap';

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

};

const NavBar = function () {
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
      <Nav className="ml-auto">
        <Nav.Link as={Link} className="link" to='/contact'>
          <div className="nav-text">
            Contact Us
          </div>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
