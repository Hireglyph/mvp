/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';

import { LoginRegisterSx } from 'theme/LoginRegisterStyle';

class PageOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  // update profile with username
  register = () => {
    const profile = {
      email: this.props.email,
      username: this.state.username,
      onboarded: true,
      admin: false,
    };

    this.props.updateProfile(profile);
  };

  render() {
    return (
      <div sx={LoginRegisterSx}>
        <div className="page-container">
          <div className="form-title">Set your username!</div>
          <input
            className="form-input"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={this.state.username}
          />
          <button
            className="auth-btn"
            id="onboard-btn"
            disabled={!this.state.username.trim()}
            onClick={this.register}
          >
            Register Username
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    updateProfile: props.firebase.updateProfile,
    email: state.firebase.auth.email,
  };
};

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(PageOnboard);
