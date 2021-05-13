/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';
import { ReactTitle } from 'react-meta-tags';

import TpPreview from 'components/TpPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';
import { displayContent } from 'utils/display';

const ProfileSx = {
  display: 'flex',

  '.page-container': {
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
  },

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
  },

  '.profile-link': {
    marginLeft: '10px',
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
    overflow: 'hidden',
  },

  '.format-text': {
    whiteSpace: 'pre-wrap',
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
    width: '33.3%',
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

  '.message-section': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    padding: '30px',
    fontStyle: 'italic',
  },

  '.message-link': {
    color: 'darkOrange',
  },
};

class PageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackExpand: new Set(),
      tpExpand: new Set(),
      replyExpand: new Set(),
    };
  }

  generateMessage = (isExpanded, id, type) => {
    if (!isExpanded) {
      return (
        <div
          onClick={() => this.changeExpand(true, id, type)}
          className="profile-message"
        >
          Expand
        </div>
      );
    }
    return (
      <div
        onClick={() => this.changeExpand(false, id, type)}
        className="profile-message"
      >
        Collapse
      </div>
    );
  };

  changeExpand = (value, id, type) => {
    let expandName, cloneSet;
    if (type==='tp') {
      expandName = 'tpExpand';
      cloneSet = new Set(this.state.tpExpand);
    }
    if (type==='feedback') {
      expandName = 'feedbackExpand';
      cloneSet = new Set(this.state.feedbackExpand);
    }
    if (type==='reply') {
      expandName = 'replyExpand';
      cloneSet = new Set(this.state.replyExpand);
    }
    value ? cloneSet.add(id) : cloneSet.delete(id);
    this.setState({ [expandName]: cloneSet });
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

  replyDelete = (replyId, replyFeedbackID, tpId) => {
    const updates = {};

    updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/reply`] = "[deleted]";
    updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/username`] = "[deleted]";
    updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/creator`] = null;

    updates[`replyHistory/${this.props.uid}/${replyId}`] = null;

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
      replyHistory,
      username,
    } = this.props;

    if (!isLoaded(tpHistory) || !isLoaded(feedbackHistory) || !isLoaded(replyHistory)) {
      return <Loading />;
    }

    if (historyParam !== 'tp' && historyParam !== 'feedback' && historyParam !== 'reply') {
      return <Redirect to={`/profile/tp`} />;
    }

    const tps = tpHistory ? (
      Object.keys(tpHistory)
        .slice(0)
        .reverse()
        .map((tpId) => {
          const tp = tpHistory[tpId];
          const isTpExpanded = this.state.tpExpand.has(tpId);
          if (tp) {
            return (
              <div className="profile-box" key={tpId}>
                <div className="profile-header">
                  <div>Response to Question #{tp.questId}</div>
                  <div className="profile-header-button">
                    {((tp.initial && tp.initial.length > length) ||
                      (tp.approach && tp.approach.length > length) ||
                      (tp.solution && tp.solution.length > length))
                     && this.generateMessage(isTpExpanded, tpId, "tp")}
                  </div>
                </div>
                <div className="profile-box-content">
                  <div
                    className={
                      (tp.total &&
                        tp.total > 0
                          ? "positive-score"
                          : tp.total < 0 && "negative-score")
                      + " profile-box-score"
                    }
                  >
                    {tp.total}
                  </div>
                  <div className="profile-box-interior">
                    <TpPreview
                      initial={tp.initial}
                      approach={tp.approach}
                      solution={tp.solution}
                      expanded={isTpExpanded}
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
                    <div className="profile-onclick">Go to TP</div>
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        })
    ) : (
      <div className="message-section">
        You have not written any TPs yet. Go to our{' '}
        <Link className="message-link" to={`/questions`}>
          Questions
        </Link>{' '}
        page to choose a problem to solve!
      </div>
    );

    const feedbacks = feedbackHistory ? (
      Object.keys(feedbackHistory)
        .slice(0)
        .reverse()
        .map((feedbackId) => {
          const {
            feedback,
            questId,
            tpId,
            username,
          } = feedbackHistory[feedbackId];

          const score = feedbackHistory[feedbackId].score;
          const isFeedbackExpanded = this.state.feedbackExpand.has(feedbackId);

          if (feedback && username && questId && tpId) {
            return (
              <div className="profile-box" key={feedbackId}>
                <div className="profile-header">
                  <div>
                    Feedback to @{username}'s TP to Question #{questId}
                  </div>
                  <div className="profile-header-button">
                    {feedback.length > length
                      && this.generateMessage(
                          isFeedbackExpanded,
                          feedbackId,
                          "feedback"
                        )}
                  </div>
                </div>
                <div className="profile-box-content">
                  <div className={
                    (score &&
                      score > 0
                        ? "positive-score"
                        : score < 0 && "negative-score")
                    + " profile-box-score"
                  }>
                    {score}
                  </div>
                  <div
                    className={
                      "profile-box-interior" +
                      (isFeedbackExpanded ? " format-text" : "")
                    }
                  >
                    <Latex>
                      {isFeedbackExpanded
                        ? displayContent(feedback)
                        : displayContent(
                            feedback.slice(0, length + 1) + 
                            (feedback.length > length ? '...' : '')
                      )}
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
                    smooth to={`/tp/${questId}/${tpId}#${feedbackId}`}
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
        })
      ) : (
        <div className="message-section">
          You have not written any feedback yet. Go to our{' '}
          <Link className="message-link" to={`/questions`}>
            Questions
          </Link>{' '}
          page to choose a problem to give other users feedback on!
        </div>
      );
    
    const replies = replyHistory ? (
      Object.keys(replyHistory)
        .slice(0)
        .reverse()
        .map((replyId) => {
          const {
            reply,
            replyFeedbackID,
            questId,
            tpId,
            username,
          } = replyHistory[replyId];

          const isReplyExpanded = this.state.replyExpand.has(replyId);
          if (reply && replyFeedbackID && username && questId && tpId) {
            return (
              <div className="profile-box" key={replyId}>
                <div className="profile-header">
                  <div>
                    Reply to to @{username} about a TP to Question #{questId}
                  </div>
                  <div className="profile-header-button">
                    {reply.length > length
                      && this.generateMessage(
                          isReplyExpanded,
                          replyId,
                          "reply"
                        )}
                  </div>
                </div>
                <div className="profile-box-content">
                  <div className="profile-box-score"/>
                  <div
                    className={
                      "profile-box-interior" +
                      (isReplyExpanded ? " format-text" : "")
                    }
                  >
                    <Latex>
                      {isReplyExpanded
                        ? displayContent(reply)
                        : displayContent(
                            reply.slice(0, length + 1) + 
                            (reply.length > length ? '...' : '')
                      )}
                    </Latex>
                  </div>
                </div>
                <div className="profile-box-bottom">
                  <div
                    className="profile-delete"
                    onClick={() => this.replyDelete(replyId, replyFeedbackID, tpId)}
                  >
                    Delete
                  </div>
                  <Link
                    className="profile-link"
                    smooth to={`/tp/${questId}/${tpId}#${replyId}`}
                  >
                    <div className="profile-onclick">
                      Go to Reply
                    </div>
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        <div className="message-section">
          You have not written any replies yet. Go to our{' '}
          <Link className="message-link" to={`/questions`}>
            Questions
          </Link>{' '}
          page to choose a problem to reply to feedback on!
        </div>
      );

    const display = historyParam === "tp" ? tps :
      ( historyParam === "feedback" ? feedbacks : replies);
    return (
      <div sx={ProfileSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <ReactTitle
          title={
            historyParam === "tp"
              ? "Profile - TPs | Hireglyph"
              : "Profile - Feedbacks | Hireglyph"
          }
        />
        <div className="page-container">
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
              Feedback Given
            </button>
            <button
              className="profile-page-buttons"
              disabled={historyParam === "reply"}
              onClick={() => this.handleTps("reply")}
            >
              Replies Given
            </button>
          </div>
          {display}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { profile, data } = state.firebase;
  const username = profile && profile.username;
  const { feedbackHistory, tpHistory, replyHistory } = data;
  const { historyParam } = props.match.params;

  return {
    feedbackHistory,
    historyParam,
    tpHistory,
    replyHistory,
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
    {
      path: '/replyHistory/' + props.uid,
      storeAs: 'replyHistory',
    }
  ]),
  connect(mapStateToProps)
)(PageProfile);
