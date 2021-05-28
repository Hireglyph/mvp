/** @jsx jsx */

import { jsx } from 'theme-ui';
import { Link } from 'react-router-dom';

const FooterSx = {
  width: 'calc(100% - 80px)',
  marginRight: '40px',
  marginLeft: '40px',
  fontSize: '14px',
  marginBottom: '10px',

  '.hr': {
    backgroundColor: '#C7C7C7',
    marginBottom: '10px',
  },

  '.footer-text': {
    color: 'mediumGrey',
    paddingLeft: '5px',
    display: 'inline-block',
  }
};

const Footer = function () {
  return (
    <div sx={FooterSx}>
      <hr className="hr"/>
      <Link to='/' className="footer-text">© 2021 Hireglyph LLC | </Link>
      <Link to='/privacy' className="footer-text">Privacy Policy | </Link>
      <Link to='/content' className="footer-text">Content Policy | </Link>
      <Link to='/contact' className="footer-text">Contact Us</Link>
    </div>
  );
};

export default Footer;
