/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { LoginRegisterSx } from 'theme/LoginRegisterStyle';
import GoogleButton from 'components/GoogleButton';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      error: '',
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  register = async () => {
    if (this.state.password === this.state.confirmPassword) {
      const credentials = {
        email: this.state.email,
        password: this.state.password,
      };

      const profile = {
        email: this.state.email,
        username: this.state.username,
        onboarded: true,
        admin: false,
      };

      try {
        await this.props.registerUser(credentials, profile);
        await this.props.auth().currentUser.sendEmailVerification();
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
    else {
      this.setState({ error: "Passwords do not match" });
    }
  };

  loginWithProvider = (provider) => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ loading: false, message: error.message });
    });
  };

  render() {
    return (
      <div sx={LoginRegisterSx}>
        <ReactTitle title="Register | Hireglyph"/>
        <div className="page-container">
          <div className="auth-title">Register</div>
          <input
            className="auth-input"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            value={this.state.email}
          />
          <input
            className="auth-input"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <input
            className="auth-input"
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Confirm password"
            type="password"
            value={this.state.confirmPassword}
          />
          <input
            className="auth-input"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={this.state.username}
          />
          <button
            className="auth-button"
            disabled={!this.state.username.trim()}
            onClick={this.register}
          >
            Register
          </button>
          <div className="auth-error">{this.state.error}</div>
          <div className="auth-line">
            ──────&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;──────
          </div>
          <GoogleButton
            onClick={() => this.loginWithProvider('google')}
            text={"Sign up with Google"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_state, props) => {
  return {
    loginUser: props.firebase.login,
    registerUser: props.firebase.createUser,
    auth: props.firebase.auth,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageRegister);
