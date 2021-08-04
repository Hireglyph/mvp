/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import hriday from 'assets/images/Hridig 2.png';
import ashley from 'assets/images/Madame CEO 1 (1).png';
import blanchard from 'assets/images/Headshot 1.png';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  fontFamily: 'Open-Sans',
  minHeight: 'calc(100vh - 100px)',

  '.page-about': {
    marginBottom: '40px',
    minWidth: '900px',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 1025px)': {
      minWidth: '700px',
      maxWidth: '700px',
    },
    '@media (max-width: 825px)': {
      minWidth: '500px',
      maxWidth: '500px',
    },
    '@media (max-width: 450px)': {
      minWidth: '350px',
      maxWidth: '350px',
    },
  },

  '.intro-section': {
    marginTop: '70px',
  },

  '.intro-title': {
    fontFamily: 'Open-Sans-SemiBold',
    fontSize: '25px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '15px',
  },

  '.explain-text': {
    fontFamily: 'Gotham-Book',
    marginLeft: '40px',
    fontSize: '15px',
    borderLeft: theme => `3px solid ${theme.colors.purple}`,
    paddingLeft: '25px',
    marginRight: '30px',
  },

  '.faq-section' : {
    marginTop: '70px',
  },

  '.question': {

  },

  '.question-title': {
    fontSize: '20px',
    fontFamily: 'Open-Sans-SemiBold-Italic',
  },

  '.icon': {
    cursor: 'pointer',
    marginLeft: '35px',
    fontSize: '30px',
    color: theme => `${theme.colors.purple}`,
    marginRight: '15px',
  },

  '.answer-text': {
    fontFamily: 'Gotham-Book',
    fontSize: '15px',
    marginLeft: '70px',
    marginRight: '30px',
    marginTop: '5px',
  },

  '.team': {
    marginTop: '50px',
  },

  '.team-title': {
    fontFamily: 'Open-Sans-SemiBold',
    fontSize: '20px',
    marginLeft: '35px',
    marginBottom: '30px',
  },

  '.pic': {
    width: '200px',
    marginBottom: '15px',
  },

  '.team-bios': {
    justifyContent: 'center',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 825px)': {
      flexDirection: 'column',
    },
  },

  '.person': {
    minWidth: '250px',
    maxWidth: '250px',
    textAlign: 'center',
    marginRight: '30px',
    marginLeft: '30px',
    '@media (max-width: 1025px)': {
      marginLeft: '10px',
      marginRight: '10px',
    },
    '@media (max-width: 825px)': {
      marginBottom: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  '.name-text': {
    fontFamily: 'Open-Sans',
    marginBottom: '10px',
  },

  '.bio-text': {
    fontFamily: 'Gotham-Book',
    textAlign: 'left',
    fontSize: '14px',
    '@media (max-width: 1025px)': {
      fontSize: '12px',
    },
    '@media (max-width: 825px)': {
      fontSize: '14px',
    },
  },

};

class PageAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      faq1: true,
      faq2: true,
    };
  }

  changeExpand = (value) => {
    this.setState({ [value] : !this.state[value] });
  };

  render () {
    return (
      <div sx={PageLandingSx}>
        <ReactTitle title="About Us | Hireglyph" />
        <div className="page-about">
          <div className="intro-section">
            <div className="intro-title">The Hireglyph Story</div>
            <div className="explain-text">
              We’ve seen firsthand the struggles of our classmates and 
              peers in trying to break into careers like quant finance. 
              From an outsider’s perspective, the field is a blackbox. 
              Quant interview preparation resources are scattered across 
              books, videos, and personal anecdotes, with no centralized 
              community or source of questions. The best, most transparent 
              options tend to be pre-professional clubs and mock interviews, 
              which aren’t readily accessible to the majority of people.
              <br />
              <br />
              Hireglyph is here to equalize the playing field in quant finance 
              — we want to centralize interview preparation and also bring 
              together the quant + aspiring quant community at large. Whether 
              you’re a student with no professional experience yet looking to 
              grow your math/stats skills, or a software engineer looking to try
              a new career path, or a seasoned quant looking for some fun 
              problems to solve, Hireglyph is the place for you.
            </div>
          </div>
          <div className="faq-section">
            <div className="question">
              <div style={{ display: 'flex', marginTop: '15px',}}>
                <div>
                  <FontAwesomeIcon
                    onClick={() => this.changeExpand("faq1")}
                    icon={this.state.faq1 ? faAngleDown : faAngleRight}
                    className="icon"
                  />
                </div>
                <div className="question-title">
                  What's a "TP"?
                </div>
              </div>
              {this.state.faq1 && <div className="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Mauris pulvinar pretium ipsum, id efficitur libero 
                  venenatis a. Duis at vestibulum ante. Nulla maximus dui 
                  quis enim rutrum volutpat. Vivamus sit amet neque scelerisque
                  erat placerat blandit.
                </div>}
            </div>
            <div className="question">
              <div style={{ display: 'flex', marginTop: '15px', }}>
                <div>
                  <FontAwesomeIcon
                    onClick={() => this.changeExpand("faq2")}
                    icon={this.state.faq2 ? faAngleDown : faAngleRight}
                    className="icon"
                  />
                </div>
                <div className="question-title">
                  Why the 3-box structure?
                </div>
              </div>
              {this.state.faq2 && <div className="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Mauris pulvinar pretium ipsum, id efficitur libero 
                  venenatis a. Duis at vestibulum ante. Nulla maximus dui 
                  quis enim rutrum volutpat. Vivamus sit amet neque scelerisque
                  erat placerat blandit.
                </div>}
            </div>
          </div>
          <div className="team">
            <div className="team-title">Our Team</div>
            <div className="team-bios">
              <div className="person">
                <img className="pic" src={ashley} alt="Ashley Zhuang"/>
                <div className="name-text">
                  Ashley Zhuang, Co-Founder
                </div>
                <div className="bio-text">
                  Ashley is pursuing a B.A. at Harvard University in 
                  Computer Science and Mathematics. She has a strong 
                  technical background from her work at Facebook and in 
                  leading full-stack software development for other 
                  projects in her free time. Ashley is also a Jane Street 
                  INSIGHT Fellow and a D. E. Shaw Discovery Fellow.
                </div>
              </div>
              <div  className="person">
                <img className="pic" src={hriday} alt="Hriday Sheth" />
                <div className="name-text">
                  Hriday Sheth, Co-Founder
                </div>
                <div className="bio-text">
                  Hriday Sheth attends UC Berkeley as an Electrical 
                  Engineering and Computer Science (EECS) major. He 
                  has strong skills in both full-stack development and 
                  business strategy, and teaches programming to formerly 
                  incarcerated students, trafficking victims, and homeless 
                  individuals in his free time.
                </div>
              </div>
              <div className="person">
                <img className="pic" src={blanchard} alt="Blanchard Kenfack" />
                <div className="name-text">
                  Blanchard Kenfack, Co-Founder
                </div>
                <div className="bio-text">
                  At the Haas School at UC Berkeley, Blanchard is a double-major 
                  in Business Administration and Data Science. He has experience 
                  as a PwC Advisory intern and as the Financial Division Project 
                  Manager at Berkeley Business Society. His expertise includes 
                  business development, financial operations, and marketing 
                  strategies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  };
  
  export default PageAbout;
