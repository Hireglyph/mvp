/** @jsx jsx */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';

import { FormSx } from 'theme/FormStyle';
import { subscribeToMailchimp } from 'utils/mailchimp';
import Checkbox from 'components/Checkbox';

class PageOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
      subscribe: true,
      select: "other",
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  formChange = (event) =>
    //console.log({this.state.select});
    this.setState({select: event.target.value});

  handleCheck = () => {
    this.setState({ subscribe: !this.state.subscribe });
  };

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
      this.setState({
        error: "Username taken. Please pick another username."
      });
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
    updates[`/userData/${this.state.select}/${uid}`] = true;

    this.props.firebase.update('/', updates);

    if (this.state.subscribe) {
      subscribeToMailchimp(this.props.email);
    }

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
          <div className="form-title-container">
            <div className="form-title">Set your username!</div>
          </div>
          <input
            className="form-input"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={this.state.username}
          />
          <div className="bottom-padding">
            <Checkbox
              label={"I want to receive quant/finance internships, interview tips, & more (don't worry, we won't spam your inbox)!"}
              checked={this.state.subscribe}
              handleCheck={this.handleCheck}
            />
          </div>
          <div>
            <label>
              How did you hear about us?
              <select value={this.state.select} onChange={this.formChange}>
                <option value="social">Social Media</option>
                <option value="google">Google Search</option>
                <option value="friend">Through a Friend</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
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
