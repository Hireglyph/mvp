/** @jsx jsx */

import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

const PageLandingSx = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  fontFamily: 'Open-Sans',
  minHeight: 'calc(100vh - 100px)',

  '.page-about': {
    minWidth: '900px',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 1025px)': {
      minWidth: '700px',
      maxWidth: '700px',
    },
    '@media (max-width: 800px)': {
      minWidth: '500px',
      maxWidth: '500px',
    },
  },

  '.intro-section': {
    marginTop: '50px',
  },

  '.intro-title': {
    fontFamily: 'Open-Sans-SemiBold',
    fontSize: '25px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px',
  },

  '.explain-text': {
    fontFamily: 'Gotham-Book',
    marginLeft: '40px',
    fontSize: '15px',
    borderLeft: theme => `3px solid ${theme.colors.purple}`,
    paddingLeft: '25px',
    marginRight: '30px',
  },
};

const PageAbout = function () {
  return (
    <div sx={PageLandingSx}>
      <ReactTitle title="About Us — Hireglyph" />
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
      </div>
    </div>
    );
  };
  
  export default PageAbout;