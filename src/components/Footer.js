/** @jsx jsx */
 
import { jsx } from 'theme-ui';
import { Link } from 'react-router-dom';
 
const FooterSx = {
  width: 'calc(100% - 80px)',
  fontSize: '14px',
  fontFamily: 'heading',
  margin: 'auto',
  marginBottom: '15px',
  
  '.hr': {
    backgroundColor: 'lightGray',
    marginBottom: '12px',
  },
  
  '.footer-link': {
    color: 'mediumGray',
    padding: '2px 15px',
    borderRight: '1px solid lightGray',
  },
  
  '#first-footer-link': {
    paddingLeft: '0',
  },
  
  '#last-footer-link': {
    borderRight: 'none',
  },
};
 
const Footer = function () {
  return (
    <div sx={FooterSx}>
      <hr className="hr"/>
      <Link to='/' className="footer-link" id="first-footer-link">© 2021 Hireglyph LLC</Link>
      <Link to='/contact' className="footer-link">Contact Us</Link>
      <Link to='/privacy' className="footer-link">Privacy Policy</Link>
      <Link to='/content' className="footer-link" id="last-footer-link">Content Policy</Link>
    </div>
  );
};
 
export default Footer;