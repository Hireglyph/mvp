/** @jsx jsx */

import { Component } from "react";
import { jsx } from 'theme-ui';

import google from 'assets/images/google-image.png';

const GoogleButtonSx = {
  '.google-button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '38px',
    fontFamily: 'Open-Sans',
    fontWeight: '400',
    borderRadius: '0',
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',

    '&:hover': {
      backgroundColor: 'lightGrey',
    },
  
    '.google-icon': {
      height: '25px', 
      paddingRight: '15px',
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
