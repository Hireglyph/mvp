/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { LoginRegisterSx } from 'theme/LoginRegisterStyle';
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

    this.setState({ loading: true });

    try {
      await this.props.firebase.login(credentials);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // login with Google
  loginWithProvider = (provider) => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ message: error.message, loading: false });
    });
  };

  render() {
    return (
      <div sx={LoginRegisterSx}>
        <ReactTitle title="Login | Hireglyph"/>
        <div className="page-container">
          <div>
            <div className="auth-title">Login</div>
          </div>
          {/* inputs for email + password */}
          <div className="input-container">
            <input
              name="email"
              className="auth-input"
              onChange={this.handleChange}
              placeholder="Email"
              value={this.state.email}
            />
            <br />
            <input
              name="password"
              className="auth-input"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
          </div>
          {!this.state.loading ? (
            <div className="btn-container">
              {/* button to log in w/ email + pass */}
              <button className="auth-button" onClick={this.login}>
                Log in
              </button>
              <div className="auth-error">{this.state.error}</div>
              <div className="auth-line">
                ──────&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;──────
              </div>
              {/* button to log in with Google */}
              <GoogleButton onClick={() => this.loginWithProvider('google')} />

              {/* link to register page */}
              <div className="auth-closing">
                New to Hireglyph?&nbsp;
                <Link to="register" className="auth-closing-link">
                  Register Here!
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
