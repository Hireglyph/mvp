/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { LoginRegisterSx } from 'theme/LoginRegisterStyle';

const PageNotFound = function () {
  return (
    <div sx={LoginRegisterSx}>
      <ReactTitle title="Page Not Found | Hireglyph"/>
      <div className="page-container">
        <div className="auth-title">Page Not Found</div>
        <div className="not-found-text">
          The page you are looking for cannot be found.
          Try going back one page, or go back to the 
          <Link className="auth-closing-link" to='/'> Problems</Link> page.
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
