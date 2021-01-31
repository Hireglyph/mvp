import React from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import PageOnboard from "./PageOnboard";
import PageConfirmEmail from "./PageConfirmEmail";
import Loading from "../components/Loading.js";
import GoogleButton from "components/GoogleButton";

import "../styles/PageRegister.css";

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      error: "",
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  register = async () => {
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
  };

  loginWithProvider = (provider) => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch((error) => {
      this.setState({ loading: false, message: error.message });
    });
  };

  render() {
    const { isLoaded, onboarded, auth, uid } = this.props;
    const user = auth().currentUser;

    if (!isLoaded) {
      return <Loading />;
    }

    if (uid && !onboarded) {
      return <PageOnboard />;
    }

    if (uid && user && !user.emailVerified) {
      return <PageConfirmEmail />;
    }

    if (uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="register-container">
        <div className="register-block">
          <div className="register-title">
            <h2>Join the community!</h2>
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
            <br />
            <input
              className="input"
              name="username"
              onChange={this.handleChange}
              placeholder="Username"
              value={this.state.username}
            />
          </div>
          <br />
          <button
            className="button"
            disabled={!this.state.username.trim()}
            onClick={this.register}
          >
            register!
          </button>
          <br />
          <GoogleButton
            onClick={() => this.loginWithProvider("google")}
            text={"Sign up with Google"}
          />
          <button
            className="login"
            onClick={() => (window.location.href = "/login")}
          >
            login
          </button>
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
