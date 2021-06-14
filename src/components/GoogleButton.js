/** @jsx jsx */

import { Component } from "react";
import { jsx } from 'theme-ui';

import google from 'assets/images/google-image.png';

const GoogleButtonSx = {
  '.google-button': {
    display: 'flex',
    marginRight: '60px',
    marginLeft: '60px',
    width: 'calc(100% - 120px)',
    height: '35px',
    border: '1px solid #000000',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontFamily: 'Open-Sans',
    fontSize: '20px',
    fontWeight: '100',
    '&:hover': {
      backgroundColor: 'lightGrey',
    },
  
    '.google-icon': {
      height: '25px', 
      marginTop: '2px',
      marginLeft: '40px',
    },

    '.google-text': {
      lineHeight: '30px',
      marginLeft: '40px',
    },
  },
};

// click on button --> log in with google (function passed from parent)
export default class GoogleButton extends Component {
  render() {
    return (
      <div sx={GoogleButtonSx}>
        <button
          className="google-button"
          type="button"
          onClick={this.props.onClick}
        >
          <img
            alt="google"
            src={google}
            className="google-icon"
          />
          <span
            className="google-text"
          >
            {this.props.text || "Sign in with Google"}
          </span>
        </button>
      </div>
    );
  }
}
