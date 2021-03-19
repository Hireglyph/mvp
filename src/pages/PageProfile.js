/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';

import TpPreview from 'components/TpPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';

const ProfileSx = {
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '700px',
  height: 'auto',
  fontFamily: 'Open-Sans',
  display: 'flex',
  flexDirection: 'column',

  '.profile-box': {
    width: '100%',
    marginBottom: '10px',
    backgroundColor: 'lightGrey',
  },

  '.profile-header': {
    display: 'flex',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '20px',
  },

  '.profile-header-button': {
    marginRight: '0px',
    marginLeft: 'auto',
  },

  '.profile-box-bottom': {
    display: 'flex',
    float: 'right',
    marginRight: '20px',
    marginBottom: '5px',
    gap: '10px',
  },

  '.profile-link': {
    textDecoration: 'none',
  },

  '.profile-onclick': {
    fontFamily: 'Open-Sans',
    fontSize: '12px',
    height: '20px',
    lineHeight: '20px',
    width: 'auto',
    paddingRight: '5px',
    paddingLeft: '5px',
    textAlign: 'center',
    backgroundColor: 'orange',
    color: 'black',
    border: '1px solid black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },

  '.profile-delete': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    lineHeight: '20px',
    '&:hover': {
      color: 'red',
    },
  },

  '.profile-message': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '.profile-box-content': {
    display: 'flex',
    marginTop: '5px',
    marginBottom: '5px',
    marginRight: '20px',
  },

  '.profile-box-interior': {
    backgroundColor: 'white',
    width: '100%',
    padding: '5px',
    fontFamily: 'Gotham-Book',
    overflow: 'auto',
  },

  '.profile-box-score': {
    textAlign: 'center',
    width: '40px',
  },

  '.positive-score': {
    color: '#27B12A',
  },

  '.negative-score': {
    color: 'red',
  },

  '.profile-page-header': {
    display: 'flex',
    marginBottom: '10px',
  },

  '.profile-username': {
    color: 'white',
    fontSize: '25px',
    marginBottom: '10px',
  },

  '.profile-page-buttons': {
    width: '50%',
    height: '35px',
    backgroundColor: 'lightGrey',
    border: 'none',
    fontFamily: 'Open-Sans',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
      opacity: '1.0',
    },
  },
};

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
        <div
          onClick={() => this.changeTpExpand(true, tpId)}
          className="profile-message"
        >
          Expand
        </div>
      );
    }
    return (
      <div
        onClick={() => this.changeTpExpand(false, tpId)}
        className="profile-message"
      >
        Collapse
      </div>
    );
  };

  generateFeedbackMessage = (isExpanded, feedbackId) => {
    if (!isExpanded) {
      return (
        <div
          onClick={() => this.changeFeedbackExpand(true, feedbackId)}
          className="profile-message"
        >
          Expand
        </div>
      );
    }
    return (
      <div
        onClick={() => this.changeFeedbackExpand(false, feedbackId)}
        className="profile-message"
      >
        Collapse
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
      tpHistory,
      username,
    } = this.props;

    if (!isLoaded(tpHistory) || !isLoaded(feedbackHistory)) {
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
              <div className="profile-box" key={tpId}>
                <div className="profile-header">
                  <div>
                    Response to Question #{tp.questId}
                  </div>
                  <div className="profile-header-button">
                    {(tp.initial && tp.initial.length > length) ||
                    (tp.approach && tp.approach.length > length) ||
                    (tp.solution && tp.solution.length > length)
                      ? this.generateTpMessage(this.state.tpExpand[tpId], tpId)
                      : ""}
                  </div>
                </div>
                <div className="profile-box-content">
                  <div 
                    className={
                      (tp.total 
                        ? 
                          (tp.total > 0 ? "positive-score" 
                          : 
                          tp.total < 0 ? "negative-score" 
                          : "") 
                        : "" )
                        + " profile-box-score"
                    }
                  >
                    {typeof tp.total === "undefined" ? "NA" : tp.total}
                  </div>
                  <div className="profile-box-interior">
                    <TpPreview
                      initial={tp.initial}
                      approach={tp.approach}
                      solution={tp.solution}
                      expanded={this.state.tpExpand[tpId]}
                    />
                  </div>
                </div>
                <div className="profile-box-bottom">
                  <div
                    className="profile-delete"
                    onClick={() => this.tpDelete(tpId, tp.questId)}
                  >
                    Delete
                  </div>
                  <Link
                    className="profile-link"
                    to={`/tp/${tp.questId}/${tpId}`}
                  >
                    <div className="profile-onclick">
                      Go to TP
                    </div>
                  </Link>
                </div>
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
              <div className="profile-box" key={feedbackId}>
                <div className="profile-header">
                  <div>
                    Feedback to @{username}'s TP to Question #{questId}
                  </div>
                  <div className="profile-header-button">
                    {feedback.length > length
                      ? this.generateFeedbackMessage(
                          this.state.feedbackExpand[feedbackId],
                          feedbackId
                        )
                      : ""}
                  </div>
                </div>
                <div className="profile-box-content">
                  <div className={
                    (score === "NA" ? "" 
                      :
                      score > 0 ? "positive-score" 
                      : 
                      score < 0 ? "negative-score" : "")
                    + " profile-box-score"
                  }>
                    {score}
                  </div>
                  <div className="profile-box-interior">
                    <Latex>
                      {this.state.feedbackExpand[feedbackId]
                        ? feedback
                        : feedback.slice(0, length + 1) +
                          (feedback.length > length ? "..." : "")}
                    </Latex>
                  </div>
                </div>
                <div className="profile-box-bottom">
                  <div
                    className="profile-delete"
                    onClick={() => this.feedbackDelete(feedbackId, tpId)}
                  >
                    Delete
                  </div>
                  <Link
                    className="profile-link"
                    to={`/tp/${questId}/${tpId}#${feedbackId}`}
                  >
                    <div className="profile-onclick">
                      Go to Feedback
                    </div>
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        });

    const display = historyParam === "tp" ? tps : feedbacks;

    return (
      <div sx={ProfileSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div className="profile-username">
          Your profile, @{username}
        </div>
        <div className="profile-page-header">
          <button
            className="profile-page-buttons"
            disabled={historyParam === "tp"}
            onClick={() => this.handleTps("tp")}
          >
            TPs Submitted
          </button>
          <button
            className="profile-page-buttons"
            disabled={historyParam === "feedback"}
            onClick={() => this.handleTps("feedback")}
          >
            Feedbacks Given
          </button>
        </div>
        {display}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { profile, data } = state.firebase;
  const username = profile && profile.username;
  const { feedbackHistory, tpHistory } = data;
  const { historyParam } = props.match.params;

  return {
    feedbackHistory,
    historyParam,
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
