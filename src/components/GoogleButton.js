import React, { Component } from 'react';
import Google from 'assets/Google.svg';

export default class GoogleButton extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="google-button"
          onClick={this.props.onClick}
        >
          <span className="google-button__icon">
            <img src={Google} alt="Google icon" />
          </span>
          <span className="google-button__text">
            {this.props.text || 'Sign in with Google'}
          </span>
        </button>
        <br />
        <br />
      </div>
    );
  }
}
