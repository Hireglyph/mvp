/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

const NotFoundSx = {
  display: 'flex',

  '.page-container': {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
    width: '400px',
    height: 'auto',
    background: 'lightGrey',
    fontFamily: 'Open-Sans',
    border: '2px solid #000000',
  },

  '.not-found-title': {
    marginTop: '25px',
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '20px',
  },

  '.not-found-text': {
    textAlign: 'center',
    marginBottom: '20px',
    marginRight: '20px',
    marginLeft: '20px',
  },

  '.link-centered': {
    textAlign: 'center',
    margin: 'auto',
    marginBottom: '30px',
  },

  '.not-found-button': {
    backgroundColor: 'orange',
    color: 'black',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',
    textDecoration: 'none',
    border: '1px solid black',

    '&:hover': {
      backgroundColor: 'darkOrange',
    }
  },

};

const PageNotFound = function () {
  return (
    <div sx={NotFoundSx}>
      <ReactTitle title="Page Not Found | Hireglyph"/>
      <div className="page-container">
        <div className="not-found-title">Page Not Found</div>
        <div className="not-found-text">
          The page you are looking for cannot be found.
        </div>
        <div className="link-centered">
          <Link
            className="not-found-button"
            to='/'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
