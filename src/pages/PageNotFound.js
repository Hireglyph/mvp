/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { FormSx } from 'theme/FormStyle';

const PageNotFound = function () {
  return (
    <div sx={FormSx}>
      <ReactTitle title="Page Not Found | Hireglyph"/>
      <div className="page-container">
        <div className="form-title">Page Not Found</div>
        <div className="notif-text">
          The page you are looking for cannot be found.
          Try going back one page, or go back to the 
          <Link className="form-link" to='/'> Problems</Link> page.
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
