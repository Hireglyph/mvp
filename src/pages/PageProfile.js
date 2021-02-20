import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';

import TpPreview from 'components/TpPreview.js';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';

import 'styles/PageProfile.css';

class PageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackExpand: {},
      loading: true,
      tpExpand: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { feedbackHistory, tpHistory } = this.props;

    if (prevState.loading && isLoaded(tpHistory) && isLoaded(feedbackHistory)) {
      if (tpHistory) {
        let tpList = {};
        Object.keys(tpHistory).forEach((tpId) => (tpList[tpId] = false));
        this.setState({ tpExpand: tpList });
      }
      if (feedbackHistory) {
        let feedbackList = {};
        Object.keys(feedbackHistory).forEach(
          (feedbackId) => (feedbackList[feedbackId] = false)
        );
        this.setState({ feedbackExpand: feedbackList });
      }
      this.setState({ loading: false });
    }
  }

  generateTpMessage = (isExpanded, tpId) => {
    if (!isExpanded) {
      return (
        <div onClick={() => this.changeTpExpand(true, tpId)}>Expand TP</div>
      );
    }
    return (
      <div onClick={() => this.changeTpExpand(false, tpId)}>Collapse TP</div>
    );
  };

  generateFeedbackMessage = (isExpanded, feedbackId) => {
    if (!isExpanded) {
      return (
        <div onClick={() => this.changeFeedbackExpand(true, feedbackId)}>
          Expand Feedback
        </div>
      );
    }
    return (
      <div onClick={() => this.changeFeedbackExpand(false, feedbackId)}>
        Collapse Feedback
      </div>
    );
  };

  changeTpExpand = (value, tpId) => {
    this.setState({ tpExpand: { ...this.state.tpExpand, [tpId]: value } });
  };

  changeFeedbackExpand = (value, feedbackId) => {
    this.setState({
      feedbackExpand: { ...this.state.feedbackExpand, [feedbackId]: value },
    });
  };

  tpDelete = (tpId, questId) => {
    const updates = {};

    updates[`/tps/${questId}/${tpId}/initial`] = "[deleted]";
    updates[`/tps/${questId}/${tpId}/approach`] = "[deleted]";
    updates[`/tps/${questId}/${tpId}/solution`] = "[deleted]";

    updates[`/tps/${questId}/${tpId}/username`] = "[deleted]";
    updates[`/tps/${questId}/${tpId}/creator`] = null;

    updates[`tpHistory/${this.props.uid}/${tpId}`] = null;

    this.props.firebase.update("/", updates);
  }

  feedbackDelete = (feedbackId, tpId) => {
    const updates = {};

    updates[`/feedbacks/${tpId}/${feedbackId}/feedback`] = "[deleted]";
    updates[`/feedbacks/${tpId}/${feedbackId}/username`] = "[deleted]";
    updates[`/feedbacks/${tpId}/${feedbackId}/creator`] = null;

    updates[`feedbackHistory/${this.props.uid}/${feedbackId}`] = null;

    this.props.firebase.update("/", updates);
  }

  handleTps = (historyParam) => {
    this.props.history.push(`/profile/${historyParam}`);
  };

  render() {
    const {
      feedbackHistory,
      historyParam,
      profile,
      tpHistory,
      username,
    } = this.props;

    if (!isLoaded(profile)) {
      return <Loading />;
    }

    if (historyParam !== 'tp' && historyParam !== 'feedback') {
      return <Redirect to={`/profile/tp`} />;
    }

    const tps =
      tpHistory &&
      Object.keys(tpHistory)
        .slice(0)
        .reverse()
        .map((tpId) => {
          const tp = tpHistory[tpId];
          if (tp) {
            return (
              <div className="individual-tp-preview" key={tpId}>
                <div className="main-tp-text">
                  <button onClick={() => this.tpDelete(tpId, tp.questId)}>
                    DELETE TP
                  </button>
                  <div className="tp-preview-username">
                    Response to Question #{tp.questId}
                  </div>
                  <TpPreview
                    initial={tp.initial}
                    approach={tp.approach}
                    solution={tp.solution}
                    expanded={this.state.tpExpand[tpId]}
                  />
                  <div>
                    <span className="tp-preview-head">Score:</span>
                    <span className="tp-preview-tail">
                      {typeof tp.total === "undefined" ? "NA" : tp.total}
                    </span>
                  </div>
                  <div className="align-right">
                    {(tp.initial && tp.initial.length > length) ||
                    (tp.approach && tp.approach.length > length) ||
                    (tp.solution && tp.solution.length > length)
                      ? this.generateTpMessage(this.state.tpExpand[tpId], tpId)
                      : ""}
                    <Link
                      className="tp-full-goto"
                      to={`/tp/${tp.questId}/${tpId}`}
                    >
                      Go to full TP
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            );
          }
          return null;
        });

    const feedbacks =
      feedbackHistory &&
      Object.keys(feedbackHistory)
        .slice(0)
        .reverse()
        .map((feedbackId) => {
          const { feedback, questId, tpId, username } = feedbackHistory[
            feedbackId
          ];

          const score =
            typeof feedbackHistory[feedbackId].score === "undefined"
              ? "NA"
              : feedbackHistory[feedbackId].score;
          if (feedback && username && questId && tpId) {
            return (
              <div className="individual-tp-preview" key={feedbackId}>
                <link
                  href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
                  rel="stylesheet"
                />
                <div className="main-tp-text">
                  <button onClick={() => this.feedbackDelete(feedbackId, tpId)}>
                    DELETE Feedback
                  </button>
                  <div className="tp-preview-username">
                    Feedback to @{username}'s TP to Question #{questId}
                  </div>
                  <div>
                    <span className="tp-preview-head">Feedback:</span>
                    <span className="tp-preview-tail">
                      <Latex>
                        {this.state.feedbackExpand[feedbackId]
                          ? feedback
                          : feedback.slice(0, length + 1) +
                            (feedback.length > length ? "..." : "")}
                      </Latex>
                    </span>
                  </div>
                  <div>
                    <span className="tp-preview-head">Score:</span>
                    <span className="tp-preview-tail"> {score}</span>
                  </div>
                  <div className="align-right">
                    {feedback.length > length
                      ? this.generateFeedbackMessage(
                          this.state.feedbackExpand[feedbackId],
                          feedbackId
                        )
                      : ""}
                    <Link
                      className="tp-full-goto"
                      to={`/tp/${questId}/${tpId}#${feedbackId}`}
                    >
                      Go to Feedback
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            );
          }
          return null;
        });

    const display = historyParam === "tp" ? tps : feedbacks;

    return (
      <div className="background2">
        <div className="intro2">Your profile, @{username} </div>
        <div>
          <button
            disabled={historyParam === "tp"}
            onClick={() => this.handleTps("tp")}
          >
            My TP History
          </button>
          <button
            disabled={historyParam === "feedback"}
            onClick={() => this.handleTps("feedback")}
          >
            My Feedback History
          </button>
        </div>
        <br />
        {display}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { profile, data } = state.firebase;
  const { email, username } = profile || {};
  const { feedbackHistory, tpHistory } = data;
  const { historyParam } = props.match.params;

  return {
    email,
    feedbackHistory,
    historyParam,
    profile,
    tpHistory,
    username,
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: '/tpHistory/' + props.uid,
      storeAs: 'tpHistory',
    },
    {
      path: '/feedbackHistory/' + props.uid,
      storeAs: 'feedbackHistory',
    },
  ]),
  connect(mapStateToProps)
)(PageProfile);
