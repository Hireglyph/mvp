/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';

import { FormSx } from 'theme/FormStyle';

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
  register = async () => {
    const { username } = this.state;
    const { uid } = this.props;

    if (!this.isUsernameValid(username)) {
      this.setState({
        error: "Username is invalid. Only lowercase alphabetic characters, numbers, dashes, and underscores are allowed."
      });
      return;
    }

    const usernameExists = await this.checkUsernameExists(username);
    if (usernameExists) {
      this.setState({ error: "Username taken." });
      return;
    }

    const updates = {};
    updates[`/users/${uid}`] = {
      email: this.props.email,
      username,
      onboarded: true,
      admin: false,
    };
    updates[`/usernameIndex/${username}`] = true;

    this.props.firebase.update('/', updates);
    this.props.history.push('/questions');
  };

  // only allow
  isUsernameValid = username => {
    const regexp = /^[a-z0-9-_]+$/;
    return username.search(regexp) !== -1;
  }

  checkUsernameExists = async username => {
    const snapshot = await this.props.firebase
      .database()
      .ref(`usernameIndex/${username}`)
      .once('value');
    return snapshot.exists();
  };

  render() {
    return (
      <div sx={FormSx}>
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
            className="form-btn"
            id="onboard-btn"
            disabled={!this.state.username.trim()}
            onClick={this.register}
          >
            Register Username
          </button>
          <div className="form-small-text auth-error">
            {this.state.error}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    updateProfile: props.firebase.updateProfile,
    email: state.firebase.auth.email,
    uid: state.firebase.auth.uid,
  };
};

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(PageOnboard);
