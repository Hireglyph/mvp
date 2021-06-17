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
      await this.props.firebase.login(credentials);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  // login with Google
  loginWithProvider = (provider) => {
    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ message: error.message });
    });
  };

  render() {
    return (
      <div sx={FormSx}>
        <ReactTitle title="Login | Hireglyph"/>
        <div className="page-container">
          <div>
            <div className="form-title">Login</div>
          </div>
          <div className="form-small-text auth-error">{this.state.error}</div>
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
          {!this.state.loading ? (
            <div className="auth-btn-container">
              {/* button to log in w/ email + pass */}
              <button className="form-btn" onClick={this.login}>
                Log in
              </button>
              <div className="auth-line">
                ──────&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;──────
              </div>
              {/* button to log in with Google */}
              <GoogleButton onClick={() => this.loginWithProvider('google')} />

              {/* link to register page */}
              <div className="auth-closing">
                New to Hireglyph?&nbsp;
                <Link to="register" className="form-link">
                  Register here!
                </Link>
              </div>
            </div>
          ) : (
            <Loading />
          )}
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
