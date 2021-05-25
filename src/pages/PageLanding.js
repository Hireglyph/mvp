/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui'
import { ReactTitle } from 'react-meta-tags';
import Mailchimp from 'components/Mailchimp';

import landingMain from 'assets/images/landing-main.png';
import harvardIlab from 'assets/images/harvard-ilab.png';
import berkeleySkydeck from 'assets/images/berkeley-skydeck.png';
import accessQuestions from 'assets/images/access-questions.svg';
import joinCommunity from 'assets/images/join-community.svg';
import receiveFeedback from 'assets/images/receive-feedback.svg';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  fontFamily: 'Open-Sans',
  lineHeight: '30px',

  '.title': {
    marginTop: '60px',
    marginLeft: '50px',
    marginRight: '50px',
    fontFamily: 'Open-Sans-Bold',
    color: 'black',
    fontSize: '30px',
    alignItems: 'center',
    textAlign: 'center',
    '@media(max-width: 450px)': {
      fontSize: '16px',
    },
  },

  '.main-box': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '60px',
    justifyContent: 'center',
  },

  '.main-image': {
    height: '350px',
    '@media(max-width: 450px)': {
      height: '150px',
    },
  },

  '.main-text': {
    width: '600px',
    marginLeft: '60px',
    '@media(max-width: 1075px)': {
      width: '300px',
    },
    '@media(min-width: 600px) and (max-width: 900px)': {
      width: '500px',
    },
    '@media(max-width: 600px)': {
      width: '300px',
    },
  },

  '.sub-title': {
    fontFamily: 'Gotham-Book',
    fontSize: '18px',
    '@media(max-width: 450px)': {
      fontSize: '10px',
    },
  },

  '.bold': {
    fontFamily: 'Gotham-SemiBold',
  },

  '.join-mailing': {
    marginTop: '40px',
    fontFamily: 'Open-Sans-Bold',
    fontSize: '25px',
    '@media(max-width: 450px)': {
      fontSize: '16px',
    },
  },

  '.mailing-li': {
    marginTop: '15px',
    fontFamily: 'Gotham-Book',
    fontSize: '18px',
    '@media(max-width: 450px)': {
      fontSize: '10px',
    },
  },

  '.logo-box': {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '50px',
    marginRight: '50px',
    justifyContent: 'center',
  },

  '.logo-banner': {
    marginTop: '40px',
    backgroundColor: 'lightPurpleGrey',
  },

  '.logo-text': {
    padding: '20px',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '22px',
  },

  '.logo': {
    marginBottom: '40px',
    marginLeft: '20px',
    marginRight: '20px',
    height: '90px',
    '@media(max-width: 900px)': {
      height: '50px',
    },
    '@media(max-width: 450px)': {
      height: '35px',
    },
  },

  '.explain-banner': {
    backgroundColor: '#2F2E2E',
  },

  '.explain-text': {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Open-Sans-SemiBold',
    fontSize: '28px',
    color: 'white',
    padding: '30px',
  },

  '.image-box': {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '50px',
    marginRight: '50px',
    justifyContent: 'center',
    '@media(max-width: 660px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  '.icon': {
    marginBottom: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    height: '150px',
    alignSelf: 'center',
    '@media(max-width: 1075px)': {
      height: '175px',
    },
    '@media(min-width: 600px) and (max-width: 900px)': {
      height: '150px',
      marginLeft: '25px',
      marginRight: '25px',
    },
    '@media(max-width: 660px)': {
      height: '200px',
    },
    '@media(max-width: 450px)': {
      height: '150px',
    },
  },

  '.icon-text': {
    width: '250px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Open-Sans-SemiBold',
    fontSize: '20px',
    marginBottom: '30px',
  },

  '.launch-banner': {
    fontFamily: 'Open-Sans-Italic',
    fontSize: '28px',
    textAlign: 'center',
    backgroundColor: 'lightPurpleGrey',
    padding: '12px',
  },

  '.center': {
    textAlign: 'center'
  },

  '.subscribe-button': {
    backgroundColor: 'purple',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    height: '40px',
    borderRadius: '5px',
    marginLeft: '5px',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
  },

  '.disabled': {
    backgroundColor: 'gray',
  }
}

class PageLanding extends React.Component {
  render() {
    return (
      <div sx={PageLandingSx}>
        <ReactTitle
          title="Hireglyph - The Future of Collaborative Interview Preparation"
        />
        <div className="flex-elements centered">
          <div className="title">
            Ace your next finance interview through the power of community.
          </div>
          <div className="main-box">
            <div>
              <img src={landingMain} alt="landingMain" className="main-image" />
            </div>
            <div className="main-text">
              <div className="sub-title">
                Hireglyph — the premier collaborative interview preparation platform for {' '}
                <span className="bold">quant</span>
                {' '} and {' '}
                <span className="bold">traditional finance</span>
                .
              </div>
              <div>
                <div className="join-mailing">Join our mailing list to...</div>
                <ul className="mailing-li">
                  <li>Get the latest finance internships right to your inbox</li>
                  <li>Learn tips and tricks about preparing for your interviews</li>
                  <li>
                    Be the first to find out about the Hireglyph platform when we
                    launch this summer
                  </li>
                </ul>
                <div className="center">
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
                      input: {
                        width: '300px',
                        height: '40px',
                        border: '1px solid rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        paddingLeft: '8px',
                        fontSize: '18px',
                      },
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
                    }}
                    className="mailchimp"
                    buttonClassName="subscribe-button"
                    disabledClassName="disabled"
                  />
                  <div style={{ fontFamily: 'Gotham-LightItalic', marginTop: '5px' }}>
                    Don’t worry, we won’t spam your inbox!
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  Access Hundreds of Questions
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
          <div className="launch-banner">
            <b>Launching Summer 2021!</b>
          </div>
        </div>
      </div>
    );
  }
};

export default PageLanding;
