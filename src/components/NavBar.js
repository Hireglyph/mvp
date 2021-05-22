/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';
import { Navbar, Nav } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';

const NavBarSx = {
  backgroundColor: 'white',
  height: '60px',
  paddingTop: '0.8em',
  paddingLeft: '40px',
  paddingRight: '40px',
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
    color: 'black',
    fontSize: '18px',
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
            style={{ height: '18px', marginBottom: '7px' }}
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
