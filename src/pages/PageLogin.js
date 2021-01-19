import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import GoogleButton from '../components/GoogleButton';
import PageOnboard from './PageOnboard';

import '../styles/PageRegister.css';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  handleChange = event =>
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

  loginWithProvider = provider => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch(error => {
      this.setState({ message: error.message, loading: false });
    });
  };

  render () {
    if (!this.props.isLoaded) {
      return (<div >Loading...</div>);
    }

    if (this.props.uid && !this.props.onboarded) {
      return <PageOnboard />
    }

    if (this.props.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className='register-container'>
        <div className='register-block'>
          <div className='register-title'>
            <h2>Welcome back!</h2>
          </div>
          <div>
            <div>{this.state.error}</div>
            <input
              className="input"
              name="email"
              onChange={this.handleChange}
              placeholder="Email"
              value={this.state.email}
            />
            <br />
            <input
              className="input"
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
                <button className='button' onClick={this.login}>login!</button>
                <br />

                <GoogleButton
                  onClick={() => this.loginWithProvider('google')}
                />

                <button className='login' onClick={() => window.location.href="/register"}>
                  register
                </button>
            </div>
          ) : (
            <div>Loading...</div>
          )
          }
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

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageLogin);
