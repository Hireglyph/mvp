/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
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

  loginWithProvider = (provider) => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ message: error.message, loading: false });
    });
  };

  render() {
    return (
      <div sx={LoginRegisterSx}>
        <div>
          <div>
            <h2>Welcome back!</h2>
          </div>
          <div>
            <div>{this.state.error}</div>
            <input
              name="email"
              onChange={this.handleChange}
              placeholder="Email"
              value={this.state.email}
            />
            <br />
            <input
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
          </div>
          <br />
          {!this.state.loading ? (
            <div>
              <button onClick={this.login}>
                login!
              </button>
              <br />

              <GoogleButton onClick={() => this.loginWithProvider('google')} />

              <button
                onClick={() => this.props.history.push("/register")}
              >
                register
              </button>
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
