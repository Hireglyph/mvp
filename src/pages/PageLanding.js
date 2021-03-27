/** @jsx jsx */

import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui'
import { ReactTitle } from 'react-meta-tags';

import meeting from 'assets/images/meeting.svg';
import submitTPs from 'assets/images/submitTPs.png';
import postFeedbacks from 'assets/images/postFeedbacks.png';
import communicate from 'assets/images/communicate.svg';
import lightbulb from 'assets/images/lightbulb.svg';
import network from 'assets/images/network.svg';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'darkBackground',
  fontFamily: 'Open-Sans',
  color: 'white',
  paddingTop: '60px',
  paddingBottom: '20px',

  '.flex-elements': {
    display: 'flex',
    marginTop: '40px',
  },

  '.main-text': {
    padding: '30px',
  },

  '.heading': {
    fontWeight: '600',
    fontSize: '45px',
    letterSpacing: '1.5px'
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
  },

  '.body-text': {
    width: '300px',
  },

  '.icon-caption': {
    marginTop: '8px',
    width: '200px',
  },

  '.icon-container': {
    textAlign: 'center',
    marginRight: '110px',
    marginLeft: '110px',
    marginTop: '100px',
    marginBottom: '30px',
  },

  '.vertical-bar': {
    height: '130px',
    width: '0px',
    border: '5px solid #EA9A28',
    margin: 'auto',
  },
}

const PageLanding = function () {
  return (
    <div sx={PageLandingSx}>
      <ReactTitle
        title="Hireglyph - The Future of Collaborative Interview Preparation"
      />
      <div className="flex-elements centered">
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
      <br />
      <br />
      <div className="flex-elements">
        <div className="centered">
          <img src={submitTPs} alt="Submit TPs" style={{ height: '300px' }} />
        </div>
        <div className="centered" style={{ marginRight: '200px' }}>
          <h3>Submit Tps</h3>
          <br />
          <div className="body-text">
            Users submit <em>thought processes</em> (TPs) to practice finance interview problems, broken down into your initial thoughts, different approaches, and final solution
          </div>
        </div>
      </div>
      <div className="flex-elements">
        <div className="centered" style={{ marginLeft: '250px' }}>
          <h3>Post Feedback</h3>
          <br />
          <div className="body-text">
            Users provide feedback on TPs, fostering community discussion and improving the quality of answers.
          </div>
        </div>
        <div className="centered">
          <img src={postFeedbacks} alt="Post Feedback" style={{ height: '350px' }} />
        </div>
      </div>
      <div className="flex-elements centered">
        <div className="icon-container">
          <div>
            <img src={communicate} alt="Communicate" style={{ height: '140px' }} />
          </div>
          <div className="icon-caption">
            Communicate your thought processes to solve complex questions
          </div>
        </div>
        <div className="vertical-bar"></div>
        <div className="icon-container">
          <div>
            <img src={lightbulb} alt="Learn" style={{ height: '140px' }} />
          </div>
          <div className="icon-caption">
            Learn a variety of problem solving approaches and have your work evaluated
          </div>
        </div>
        <div className="vertical-bar"></div>
        <div className="icon-container">
          <div>
            <img src={network} alt="Community" style={{ height: '140px' }} />
          </div>
          <div className="icon-caption">
            Join a collaborative community of aspiring financial professionals
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLanding;
