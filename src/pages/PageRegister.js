/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { FormSx } from 'theme/FormStyle';
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
    // if passwords match, create user
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
    // if passwords do not match, display message
    else {
      this.setState({ error: "Passwords do not match" });
    }
  };

  // log in with Google
  loginWithProvider = (provider) => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ loading: false, message: error.message });
    });
  };

  render() {
    return (
      <div sx={FormSx}>
        <ReactTitle title="Register | Hireglyph"/>
        <div className="page-container">
          <div className="form-title">Register</div>
          <input
            className="form-input"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            value={this.state.email}
          />
          <input
            className="form-input"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <input
            className="form-input"
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Confirm password"
            type="password"
            value={this.state.confirmPassword}
          />
          <input
            className="form-input"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={this.state.username}
          />
          <div className="auth-btn-container">
            <button
              className="form-btn"
              disabled={!this.state.username.trim()}
              onClick={this.register}
            >
              Register
            </button>
            <div className="form-small-text auth-error">{this.state.error}</div>
            <div className="auth-line">
              ──────&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;──────
            </div>
            <GoogleButton
              onClick={() => this.loginWithProvider('google')}
              text={"Sign up with Google"}
            />
            {/* link to login page */}
            <div className="auth-closing">
                Have an account?&nbsp;
                <Link to="login" className="form-link">
                  Sign in here!
                </Link>
              </div>
          </div>
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
