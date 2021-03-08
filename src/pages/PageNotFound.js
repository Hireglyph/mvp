/** @jsx jsx */

import { jsx } from 'theme-ui';
import { withRouter } from 'react-router-dom';

const NotFoundSx = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '400px',
  height: 'auto',
  background: 'lightGrey',
  fontFamily: 'Open-Sans',
  border: '1px solid #000000',

  '.not-found-title': {
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '20px',
  },

  '.not-found-text': {
    textAlign: 'center',
    marginBottom: '15px',
  },

  '.not-found-button': {
    marginBottom: '20px',
    width: '150px',
    height: '35px',
    fontFamily: 'Open-Sans',
    fontSize: '15px',
    marginRight: 'calc(50% - 75px)',
    marginLeft: 'calc(50% - 75px)',
    backgroundColor: 'orange',
    cursor: 'pointer',
    border: '1px solid #000000',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },

};

function PageNotFound(props) {
  return (
    <div sx={NotFoundSx}>
      <div className="not-found-title">Page Not Found</div>
      <div className="not-found-text">The page you are looking for cannot be found.</div>
      <button 
        className="not-found-button"
        onClick={() => props.history.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default withRouter(PageNotFound);
