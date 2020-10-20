import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import '../styles/PageRegister.css';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value, error: '' });

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

  render () {
    if (this.props.isLoggedIn) {
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
          <button className='button' onClick={this.login}>login!</button> 
          <br />
          <button className='login' onClick={() => window.location.href="/register"}>
            register
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.firebase.auth.uid };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageLogin);
