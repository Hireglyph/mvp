import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import Loading from "../components/Loading.js";
import PageOnboard from "./PageOnboard";
import PageConfirmEmail from "./PageConfirmEmail";

import "../styles/PageNotifications.css";

class PageNotifications extends React.Component {
  constructor(props) {
    super(props);
  }

  viewed = (notifId) => {
    const updates = {};
    updates[`/notifications/${this.props.uid}/${notifId}/viewed`] = true;
    this.props.firebase.update("/", updates);
  };

  componentDidUpdate(prevProps) {
    if (this.props.notifications) {
      //if(prevProps.notifications && Object.keys(prevProps.notifications).length != Object.keys(this.props.notifications).length){
      const updates = {};
      updates[`/hasNotifs/${this.props.uid}`] = false;
      this.props.firebase.update("/", updates);
    }
  }

  render() {
    if (!isLoaded(this.props.notifications) || !this.props.isLoaded) {
      return <Loading />;
    }

    if (!this.props.uid) {
      return <Redirect to="/register" />;
    }

    if (!this.props.onboarded) {
      return <PageOnboard />;
    }

    if (!this.props.emailVerified) {
      return <PageConfirmEmail />;
    }

    const notifications =
      this.props.notifications &&
      Object.keys(this.props.notifications)
        .slice(0)
        .reverse()
        .map((notifId) => {
          const notification = this.props.notifications[notifId];
          if (notification && notification.type === "tpUpvote") {
            return (
              <div key={notifId}>
                <Link
                  className={notification.viewed ? "light-link" : "dark-link"}
                  to={`/tp/${notification.questId}/${notification.tpId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div>
                    Your TP to Question #{notification.questId} was upvoted by @
                    {notification.username}
                  </div>
                </Link>
              </div>
            );
          }
          if (notification && notification.type === "tpFeedbackUpvote") {
            return (
              <div key={notifId}>
                <Link
                  className={notification.viewed ? "light-link" : "dark-link"}
                  to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div>
                    Your feedback to @{notification.author}'s TP to Question #
                    {notification.questId} was upvoted by @{notification.username}
                  </div>
                </Link>
              </div>
            );
          }
          if (notification && notification.type === "tpFeedback") {
            return (
              <div key={notifId}>
                <Link
                  className={notification.viewed ? "light-link" : "dark-link"}
                  to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div>
                    @{notification.username} gave feedback to your TP to Question
                    #{notification.questId}
                  </div>
                </Link>
              </div>
            );
          }
          return;
        });
    return <div>{notifications}</div>;
  }
}

const mapStateToProps = (state, props) => {
  const notifications = state.firebase.data.notifications;
  const user = props.firebase.auth().currentUser;
  const emailVerified = user && user.emailVerified;
  return { notifications, emailVerified };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: "/notifications/" + props.uid,
      storeAs: "notifications",
    },
  ]),
  connect(mapStateToProps)
)(PageNotifications);
