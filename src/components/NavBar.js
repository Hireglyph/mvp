import React from "react";
import { withRouter, Link } from "react-router-dom";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import "../styles/NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (link) => () => this.props.history.push(link);

  navbarContent = () => {
    if (!this.props.isLoaded || !isLoaded(this.props.hasNotifs)) {
      return;
    }
    if (!this.props.uid) {
      return (
        <div>
          <div className="link-click">
            <Link className="link-text" to="/register">
              Register
            </Link>
          </div>
          <div className="button-click">
            <button
              className="button-text"
              onClick={this.handleClick("/login")}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="link-click2">
          <Link
            className={!this.props.hasNotifs ? "link-text" : "link-text2"}
            to="/notifications"
          >
            Notifications
          </Link>
        </div>
        <div className="link-click">
          <Link className="link-text" to="/profile/tp">
            Profile
          </Link>
        </div>
        <div className="button-click">
          <button
            className="button-text"
            onClick={() => {
              this.props.firebase.logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="navbar">
        <div className="title">
          <Link className="title-text" to="/">
            Hireglyph
          </Link>
        </div>
        {this.navbarContent()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    hasNotifs:
      state.firebase.data.hasNotifs && state.firebase.data.hasNotifs[props.uid],
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: "/hasNotifs/" + props.uid,
    },
  ]),
  connect(mapStateToProps)
)(NavBar);
