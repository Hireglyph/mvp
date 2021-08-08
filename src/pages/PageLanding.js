/** @jsx jsx */

import React from 'react';
import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui'
import { ReactTitle } from 'react-meta-tags';
import Mailchimp from 'components/Mailchimp';

import landingMain from 'assets/images/landing-main.png';
import harvardIlab from 'assets/images/harvard-ilab.png';
import berkeleySkydeck from 'assets/images/berkeley-skydeck.png';
import accessQuestions from 'assets/images/access-questions.svg';
import joinCommunity from 'assets/images/join-community.svg';
import receiveFeedback from 'assets/images/receive-feedback.svg';

import { PageLandingSx } from 'theme/PageLandingStyle';

class PageLanding extends React.Component {
  render() {
    return (
      <div sx={PageLandingSx}>
        <ReactTitle
          title="Hireglyph - Quant Finance Interview Preparation"
        />
        <div className="flex-elements centered">
          <div className="main-box">
            <div className="main-text">
              <div className="title">
                Ace your next quant finance interview.
              </div>
              <div className="sub-title">
                Join our community of 1200+ aspiring professionals at Harvard, Columbia, Berkeley, Michigan, Waterloo, and more.
                <br/> <br/>
                Access the premier interview preparation platform for quant trading and research, along with curated newsletters to boost your career.
              </div>
              <Link
                to="/register"
              >
                <button className="join-btn">
                  Join Now!
                </button>
              </Link>
            </div>
            <div>
              <img src={landingMain} alt="landingMain" className="main-image" />
            </div>
          </div>
          <div className="mailing-list-section">
            <div>
              <div className="join-mailing">
                Also, join our mailing list!
              </div>
              <Mailchimp
                action='https://hireglyph.us1.list-manage.com/subscribe/post?u=04e7de515f8682261e4fd1984&amp;id=d1db2890af'
                fields={[
                  {
                    name: 'EMAIL',
                    placeholder: 'Enter your email',
                    type: 'email',
                    required: true
                  }
                ]}
                styles={{
                  sendingMsg: {
                    color: "#0652DD"
                  },
                  successMsg: {
                    color: "#009432"
                  },
                  duplicateMsg: {
                    color: "#EE5A24"
                  },
                  errorMsg: {
                    color: "#ED4C67"
                  }
                }
              }
                className="mailchimp"
                inputClassName="email-input"
                buttonClassName="subscribe-button"
                disabledClassName="disabled"
              />
                <div className="worry-message">
                  Don’t worry, we won’t spam your inbox!
                </div>
            </div>
            <div className="mailing-li">
              <div>You'll get exclusive access to...</div>
              <ul>
                <li>Curated lists of finance internships</li>
                <li>Tips and tricks about preparing for your interviews</li>
              </ul>
            </div>
          </div>
          <div className="aesthetic"/>
          <div className="logo-banner">
            <div className="logo-text">Hireglyph is backed by</div>
            <div className="logo-box">
              <img src={harvardIlab} alt="harvardIlab" className="logo" />
              <img src={berkeleySkydeck} alt="berkeleySkydeck" className="logo" />
            </div>
          </div>
          <div className="explain-banner">
            <div className="explain-text">What we offer</div>
            <div className="image-box">
              <div>
                <img src={accessQuestions} alt="accessQuestions" className="icon" />
                <div className="icon-text" style={{ color: '#A4FFBE' }}>
                  Access a Variety of Questions
                </div>
              </div>
              <div>
                <img src={joinCommunity} alt="joinCommunity" className="icon" />
                <div className="icon-text" style={{ color: '#B8B8FF' }}>
                  Join a Community of Problem-Solvers
                </div>
              </div>
              <div>
                <img src={receiveFeedback} alt="receiveFeedback" className="icon" />
                <div className="icon-text" style={{ color: '#85D3FF' }}>
                  Receive Feedback on Your Solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PageLanding;