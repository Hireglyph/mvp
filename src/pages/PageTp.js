import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Latex from "react-latex";
import TextareaAutosize from "react-textarea-autosize";

import red from "../assets/images/red-downvote.png";
import green from "../assets/images/green-upvote.png";
import upvote from "../assets/images/upvote.png";
import downvote from "../assets/images/downvote.png";
import PageOnboard from "./PageOnboard";
import PageConfirmEmail from "./PageConfirmEmail";
import Loading from "../components/Loading.js";

import "../styles/PageTp.css";

class PageTp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      loading: true,
      keys: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { feedbacks } = this.props;
    if (prevState.loading && isLoaded(feedbacks)) {
      let keys = feedbacks ? Object.keys(feedbacks) : [];
      keys.sort((a, b) => feedbacks[b].score - feedbacks[a].score);

      this.setState({ loading: false, keys });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createFeedback = () => {
    const {
      creator,
      firebase,
      questId,
      tpId,
      uid,
      username,
      currentUsername,
    } = this.props;
    const { feedback, keys } = this.state;

    const feedbackId = firebase.push(`/feedbacks/${tpId}`).key;
    const notificationId = firebase.push(`/notifications/${creator}`).key;
    const updates = {};
    updates[`/feedbacks/${tpId}/${feedbackId}`] = {
      feedback,
      creator: uid,
      score: 0,
      username: currentUsername,
    };
    updates[`/feedbackHistory/${uid}/${feedbackId}`] = {
      tpId,
      feedback,
      questId,
      username,
      score: 0,
    };
    updates[`/notifications/${creator}/${notificationId}`] = {
      questId,
      tpId,
      feedbackId,
      username: currentUsername,
      viewed: false,
      type: "tpFeedback",
    };
    updates[`/hasNotifs/${creator}`] = true;
    this.setState({ feedback: "" });

    const onComplete = () => {
      keys.unshift(feedbackId);
      this.setState({ keys });
    };

    this.props.firebase.update("/", updates, onComplete);
  };

  getVoteValues = (isSameVoted, isOppositeVoted) => {
    let diff = -1,
      vote = 0;
    if (!isSameVoted) {
      vote = 1;
      diff = isOppositeVoted ? 2 : 1;
    }
    return { diff, vote };
  };

  upvote = () => {
    const {
      creator,
      firebase,
      isDownvoted,
      isUpvoted,
      questId,
      total,
      tpId,
      uid,
      currentUsername,
    } = this.props;
    const updates = {};

    if (!isUpvoted) {
      const notificationId = firebase.push(`/notifications/${creator}`).key;
      updates[`/notifications/${creator}/${notificationId}`] = {
        questId,
        tpId,
        username: currentUsername,
        viewed: false,
        type: "tpUpvote",
      };
      updates[`/hasNotifs/${creator}`] = true;
    }

    const { diff, vote } = this.getVoteValues(isUpvoted, isDownvoted);
    updates[`/tps/${questId}/${tpId}/total`] = total + diff;
    updates[`/tpHistory/${creator}/${tpId}/total`] = total + diff;
    updates[`/tps/${questId}/${tpId}/users/${uid}`] = vote;
    firebase.update("/", updates);
  };

  downvote = () => {
    const {
      creator,
      firebase,
      isDownvoted,
      isUpvoted,
      questId,
      total,
      tpId,
      uid,
    } = this.props;
    const { diff, vote } = this.getVoteValues(isDownvoted, isUpvoted);

    const updates = {};
    updates[`/tps/${questId}/${tpId}/total`] = total - diff;
    updates[`/tpHistory/${creator}/${tpId}/total`] = total - diff;
    updates[`/tps/${questId}/${tpId}/users/${uid}`] = -1 * vote;
    firebase.update("/", updates);
  };

  upvoteFeedback = (feedbackId) => {
    const { feedbacks, firebase, questId, tpId, uid, username } = this.props;
    const { creator, score, users } = feedbacks[feedbackId];
    const updates = {};
    const feedbackCheck = feedbacks[feedbackId].users && uid in users;
    const isUpvoted = feedbackCheck && users[uid] === 1;
    const isDownvoted = feedbackCheck && users[uid] === -1;

    if (!isUpvoted) {
      const notificationId = firebase.push(`/notifications/${creator}`).key;
      updates[`/notifications/${creator}/${notificationId}`] = {
        questId,
        tpId,
        username: this.props.currentUsername,
        viewed: false,
        type: "tpFeedbackUpvote",
        feedbackId,
        author: username,
      };
      updates[`/hasNotifs/${creator}`] = true;
    }

    const { diff, vote } = this.getVoteValues(isUpvoted, isDownvoted);
    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = score + diff;
    updates[`/feedbackHistory/${creator}/${feedbackId}/score`] = score + diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = vote;
    firebase.update("/", updates);
  };

  downvoteFeedback = (feedbackId) => {
    const { feedbacks, firebase, tpId, uid } = this.props;
    const { creator, score, users } = feedbacks[feedbackId];
    const updates = {};
    const feedbackCheck = users && uid in users;
    const isUpvoted = feedbackCheck && users[uid] === 1;
    const isDownvoted = feedbackCheck && users[uid] === -1;
    const { diff, vote } = this.getVoteValues(isDownvoted, isUpvoted);

    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = score - diff;
    updates[`/feedbackHistory/${creator}/${feedbackId}/score`] = score - diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = -1 * vote;
    firebase.update("/", updates);
  };

  render() {
    const {
      tp,
      emailVerified,
      feedbacks,
      isDownvoted,
      isUpvoted,
      questId,
      onboarded,
      uid,
      username,
    } = this.props;

    if (!isLoaded(tp) || !isLoaded(tp)) {
      return <Loading />;
    }

    if (isEmpty(tp)) {
      return <div>Page not found!</div>;
    }

    if (!uid) {
      return <Redirect to="/register" />;
    }

    if (!onboarded) {
      return <PageOnboard />;
    }

    if (!emailVerified) {
      return <PageConfirmEmail />;
    }

    const Feedbacks =
      feedbacks &&
      this.state.keys.map((feedbackId) => {
        if (feedbacks[feedbackId]) {
          const { creator, feedback, score, username, users } = feedbacks[
            feedbackId
          ];
          const deleted = feedbacks[feedbackId].deleted;
          const isUpvoted = users && uid in users && users[uid] === 1;
          const isDownvoted = users && uid in users && users[uid] === -1;
          const feedbackUsername = username ? username : creator;
          const feedbackScoreArrows = (
            !deleted
            ?
            <div>
              <img
                className="feedback-upvote-button"
                src={isUpvoted ? green : upvote}
                onClick={() => this.upvoteFeedback(feedbackId)}
              />
              <div className="feedback-score-text">{score} </div>
              <img
                className="feedback-downvote-button"
                src={isDownvoted ? red : downvote}
                onClick={() => this.downvoteFeedback(feedbackId)}
              />
            </div>
            :
            <div></div>
          );
          return (
            <div className="user-feedback" key={feedbackId}>
              <div id={`${feedbackId}`}> </div>
              <div className="feedback-content">
                <div className="feedback-text">@{feedbackUsername}</div>
                <div className="feedback-text">
                  <Latex>{feedback}</Latex>
                </div>
              </div>
              <br />
              <br />
              {feedbackScoreArrows}
              <br />
            </div>
          );
        }
        return <div />;
      });

    const myFeedback = (
      !this.props.deleted
      ?
      <div>
        <TextareaAutosize
          minRows={2}
          className="input-feedback"
          name="feedback"
          placeholder="Your feedback..."
          onChange={this.handleChange}
          value={this.state.feedback}
        />
        <br />
        <button
          className="tp-submit-button"
          disabled={this.state.feedback.trim() === ""}
          onClick={this.createFeedback}
        >
          Submit
        </button>
      </div>
      :
      <div></div>
    );
    
    const scoreArrows = (
      !this.props.deleted
      ?
      <div>
        <img
          className="upvote-button"
          src={isUpvoted ? green : upvote}
          onClick={this.upvote}
        />
        <div className="score-text">{this.props.total}</div>
        <img
          className="downvote-button"
          src={isDownvoted ? red : downvote}
          onClick={this.downvote}
        />
      </div>
      :
      <div></div>
    );

    return (
      <div className="full-tp">
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div onClick={() => this.props.history.goBack()}>GO BACK</div>
        <div className="question-identification">
          @{username} in response to:
          <Link className="link-to-quest" to={`/q/${questId}`}>
            Question #{questId}
          </Link>
        </div>
        <br />
        <div className="label-text">{tp.initial ? "Initial Thoughts:" : ""}</div>
        <div className="body-text">
          <Latex>{tp.initial}</Latex>
        </div>
        <div className="label-text">{tp.approach ? "Approaches Tried:" : ""}</div>
        <div className="body-text">
          <Latex>{tp.approach}</Latex>
        </div>
        <div className="label-text">{tp.solution ? "Final Solution:" : ""}</div>
        <div className="body-text">
          <Latex>{tp.solution}</Latex>
        </div>
        {scoreArrows}
        <br />
        <div> {myFeedback}</div>
        <br />
        <br />
        <div>{Feedbacks}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { auth, data, profile } = state.firebase;
  const { uid } = auth;
  const { questId, tpId } = props.match.params;

  const tp = data[tpId];
  const { creator, total, deleted, username } = tp || {};
  const feedbacks = tpId && data.feedbacks && data.feedbacks[tpId];
  const isUpvoted = tp && tp.users && uid in tp.users && tp.users[uid] === 1;
  const isDownvoted = tp && tp.users && uid in tp.users && tp.users[uid] === -1;
  const currentUsername = profile && profile.username;
  const onboarded = profile && profile.onboarded;
  const { emailVerified } = props.firebase.auth().currentUser || {};

  return {
    tp,
    creator,
    emailVerified,
    feedbacks,
    isDownvoted,
    isUpvoted,
    onboarded,
    questId,
    total,
    tpId,
    uid,
    username,
    currentUsername,
    deleted,
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => {
    const questId = props.match.params.questId;
    const tpId = props.match.params.tpId;

    return [
      { path: `/tps/${questId}/${tpId}`, storeAs: tpId },
      { path: `/feedbacks/${tpId}` },
    ];
  }),
  connect(mapStateToProps)
)(PageTp);
