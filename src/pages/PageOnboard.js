import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

  register = () => {
    const profile = {
      email: this.props.email,
      username: this.state.username,
      onboarded: true,
      admin: false,
    };

    this.props.updateProfile(profile);
  };

  render() {
    return (
      <div>
        Before proceeding, set your username!
        <br />
        <input
          className="input"
          name="username"
          onChange={this.handleChange}
          placeholder="Username"
          value={this.state.username}
        />
        <button
          className="button"
          disabled={!this.state.username.trim()}
          onClick={this.register}
        >
          Confirm!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    updateProfile: props.firebase.updateProfile,
    email: state.firebase.auth.email,
  };
};

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(PageOnboard);
