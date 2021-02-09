/** @jsx jsx */
import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';

const FooterSx = {
  backgroundColor: 'orange',
  width: '100%',
  height: '50px',
  display: 'flex',
  fontSize: '15px',

  '.footer-elements': {
    display: 'flex',
    marginTop: '10px',
    gap: '40px',
  },
};

const Footer = function () {
  return (
    <div sx={FooterSx}>
      <div className="footer-elements">
        © Hireglyph LLC 2021
        <Link to={"/privacy"}>Privacy Policy</Link>
        <Link to={"/content"}>Content Policy</Link>
        <Link to={"/contact"}>Contact Us</Link>
      </div>
    </div>
  );
};

export default Footer;
