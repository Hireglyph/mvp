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
        <div className="form-title-container">
          <div className="form-title">Page Not Found</div>
        </div>
        <div className="notif-text">
          The page you're looking for cannot be found.
          Try going back one page, or go back to the 
          <Link className="form-link" to='/questions'> Problems</Link> page.
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
