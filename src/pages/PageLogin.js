/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { FormSx } from 'theme/FormStyle';
import Loading from 'components/Loading';
import GoogleButton from 'components/GoogleButton';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggingIn: false,
      loading: false,
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: '' });

  // login w/ email + password
  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      this.setState({ loggingIn: true });
      await this.props.firebase.login(credentials);
    } catch (error) {
      this.setState({ error: error.message });
    }

    this.setState({ loggingIn: false });
  };

  // login with Google
  loginWithProvider = (provider) => {
    this.setState({ loading: true });
    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ loading: false, message: error.message });
    });
  };

  render() {
    const disabled = !this.state.email.trim() ||
                     !this.state.password.trim() ||
                     this.state.loggingIn ||
                     this.state.loading;

    return (
      <div sx={FormSx}>
        <ReactTitle title="Login | Hireglyph"/>
        <div className="page-container">
          <div className="form-title-container">
            <div className="form-title">Login</div>
          </div>
          {/* inputs for email + password */}
          <div className="auth-input-container">
            <input
              name="email"
              className="form-input"
              onChange={this.handleChange}
              placeholder="Email"
              value={this.state.email}
            />
            <br />
            <input
              name="password"
              className="form-input"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
          </div>
          <div className="auth-btn-container">
            {/* button to log in w/ email + pass */}
            <button
              className="form-btn"
              onClick={this.login}
              disabled={disabled}
            >
              Log in
            </button>
            <div className="form-small-text auth-error">{this.state.error}</div>
            <div className="auth-line">
              ─────&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;─────
            </div>
            {/* button to log in with Google */}
            <GoogleButton
              onClick={() => this.loginWithProvider('google')}
              disabled={this.state.loading || this.state.loggingIn}
            />
            {/* link to register page */}
            <div className="auth-closing">
              New to Hireglyph?&nbsp;
              <Link to="register" className="form-link">
                <div>Register here!</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loginUser: props.firebase.login,
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(PageLogin);
