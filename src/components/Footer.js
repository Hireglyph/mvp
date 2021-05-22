/** @jsx jsx */

import { jsx } from 'theme-ui';

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
    color: '#464646',
    paddingLeft: '5px',
  }
};

const Footer = function () {
  return (
    <div sx={FooterSx}>
      <hr className="hr"/>
      <div className="footer-text">© 2021 Hireglyph LLC</div>
    </div>
  );
};

export default Footer;
