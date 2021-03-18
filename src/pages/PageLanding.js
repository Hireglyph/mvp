/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui'
import meeting from 'assets/images/meeting.svg';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'darkBackground',
  fontFamily: 'Open-Sans',
  color: 'white',
  paddingTop: '60px',
  paddingBottom: '20px',
  paddingLeft: '180px',

  '.top-elements': {
    display: 'flex',
    flexDirection: 'row',
  },

  '.main-text': {
    padding: '30px',
  },

  '.heading': {
    fontWeight: '600',
    fontSize: '45px',
    letterSpacing: '2px'
  },

  '.description': {
    width: '500px',
  },

  '.centered': {
    textAlign: 'center',
    margin: 'auto',
  },

  '.button-container': {
    paddingTop: '20px',
  },

  '.start-button': {
    backgroundColor: 'orange',
    color: 'black',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',
    textDecoration: 'none',
    fontWeight: '600',

    '&:hover': {
      backgroundColor: 'darkOrange',
    }
  }
}

const PageLanding = function () {
  return (
    <div sx={PageLandingSx}>
      <div className="top-elements">
        <div className="main-text">
          <h2 className="heading">Ace your next finance interview</h2>
          <div className="description centered">
            Get access to hundreds of challenging interview questions and a collaborative community to help you solve them
          </div>
          <div className="button-container centered">
            <Link to='/questions' className="start-button">
              Get started
            </Link>
          </div>
        </div>
        <div>
          <img src={meeting} alt="meeting" style={{ height: '200px' }} />
        </div>
      </div>
    </div>
  );
};

export default PageLanding;
