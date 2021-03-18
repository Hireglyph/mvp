/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';

const FooterSx = {
  backgroundColor: 'orange',
  width: '100%',
  height: '25px',
  fontSize: '15px',

  '.footer-elements': {
    paddingTop: '4px',
    paddingLeft: '10px',
  },

  '.footer-link': {
    color: 'black',
    paddingLeft: '5px',
    paddingRight: '5px',
  }
};

const Footer = function () {
  return (
    <div sx={FooterSx}>
      <div className="footer-elements">
        <Link to='/' className="footer-link">© Hireglyph LLC 2021</Link>|
        <Link to='/privacy' className="footer-link">Privacy Policy</Link>|
        <Link to='/content' className="footer-link">Content Policy</Link>|
        <Link to='/contact' className="footer-link">Contact Us</Link>
      </div>
    </div>
  );
};

export default Footer;
