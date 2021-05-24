/** @jsx jsx */

import { jsx } from 'theme-ui'
import { ReactTitle } from 'react-meta-tags';

import landingMain from 'assets/images/landing-main.png';
import harvardIlab from 'assets/images/harvard-ilab.png';
import berkeleySkydeck from 'assets/images/berkeley-skydeck.png';
import accessQuestions from 'assets/images/access-questions.png';
import joinCommunity from 'assets/images/join-community.png';
import receiveFeedback from 'assets/images/receive-feedback.png';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  fontFamily: 'Open-Sans',
  
  '.title': {
    marginTop: '40px',
    marginLeft: '50px',
    marginRight: '50px',
    fontFamily: 'Open-Bold',
    color: 'black',
    fontSize: '25px',
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
    marginLeft: '50px',
    marginRight: '50px',
    marginTop: '40px',
    justifyContent: 'center',
  },

  '.main-image': {
    height: '300px',
    '@media(max-width: 450px)': {
      height: '150px',
    },
  },

  '.main-text': {
    width: '500px',
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
    fontSize: '15px',
    '@media(max-width: 450px)': {
      fontSize: '10px',
    },
  },

  '.bold': {
    fontFamily: 'Gotham-Semi',
  },

  '.join-mailing': {
    marginTop: '20px',
    fontFamily: 'Open-Bold',
    fontSize: '25px',
    '@media(max-width: 450px)': {
      fontSize: '16px',
    },
  },

  '.mailing-li': {
    marginTop: '10px',
    fontFamily: 'Gotham-Book',
    fontSize: '15px',
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
    paddingTop: '20px',
    backgroundColor: '#EBE9F3',
  },

  '.logo-text': {
    alignItems: 'center',
    textAlign: 'center',
  },

  '.logo': {
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    height: '65px',
    '@media(max-width: 900px)': {
      height: '50px',
    },
    '@media(max-width: 450px)': {
      height: '35px',
    },
  },

  '.explain-banner': {
    paddingTop: '20px',
    backgroundColor: '#2F2E2E',
  },

  '.explain-text': {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Open-Bold',
    color: 'white',
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

  '.image': {
    marginBottom: '20px',
    marginLeft: '50px',
    marginRight: '50px',
    height: '200px',
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

}

const PageLanding = function () {
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
          <img src={landingMain} alt="landingMain" className="main-image" />
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
            <img src={accessQuestions} alt="accessQuestions" className="image" />
            <img src={joinCommunity} alt="joinCommunity" className="image" />
            <img src={receiveFeedback} alt="receiveFeedback" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLanding;
