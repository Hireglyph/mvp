/** @jsx jsx */

import { Component } from "react";
import { jsx } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const GoogleButtonSx = {

  '.google-button': {
    marginRight: '60px',
    marginLeft: '60px',
    width: 'calc(100% - 120px)',
    height: '35px',
    lineHeight: '35px',
    border: '1px solid #000000',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontFamily: 'Open-Sans',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: 'lightGrey',
    },
  },

};

export default class GoogleButton extends Component {
  render() {
    return (
      <div sx={GoogleButtonSx}>
        <button
          className="google-button"
          type="button"
          onClick={this.props.onClick}
        >
          <FontAwesomeIcon icon={faGoogle}/>
          &nbsp;&nbsp;&nbsp;
          {this.props.text || "Sign in with Google"}
        </button>
      </div>
    );
  }
}
