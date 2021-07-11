/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactTitle } from 'react-meta-tags';
import { faReply, faCaretUp, 
         faCaretDown, faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Moment from 'react-moment';

import { currentVotes, getVoteValues, upvoteTp, downvoteTp } from 'utils/vote';
import { displayContent } from 'utils/display';
import PageNotFound from 'pages/PageNotFound';
import Loading from 'components/Loading';
import { tpDelete, feedbackDelete, replyDelete } from 'utils/delete';

import { TpSx } from 'theme/PageTPStyle.js';
import { ScoreArrowsSx, ThreadBoxSx } from 'theme/ComponentStyle';

class PageTp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      loading: true,
      keys: [],
      feedbacks: {},
      reply: '',
      toUsername: null,
      replyFeedbackID: null,
      replyToID: null,
      replyLoading: true,
      replyKeys: {},
      replies: {},
    };
  }

  componentDidMount() {
    // direct query for feedbacks
    this.props.firebase.database()
      .ref(`/feedbacks/${this.props.tpId}`)
      .on('value', data => {
        if (data.val()) {
          if (this.state.loading) {
            // sort the feedbacks once
            let keys = Object.keys(data.val());
            keys.sort((a, b) => data.val()[b].score - data.val()[a].score);
            this.setState({ keys });
          }
          this.setState({ feedbacks: data.val() });
        }
        this.setState({ loading: false });
      });

    // direct query for feedback replies
    this.props.firebase.database()
      .ref(`/replies/${this.props.tpId}`)
      .on('value', data => {
        if (data.val()) {
          if (this.state.replyLoading) {
            // freeze the array of replies for each feedbackId once
            var replyKeysCopy = this.state.replyKeys;
            Object.keys(data.val()).forEach(feedbackId => {
              replyKeysCopy[feedbackId] = Object.keys(data.val()[feedbackId]);
            });
            this.setState({ replyKeys: replyKeysCopy });
          }
          this.setState({ replies: data.val() });
        }
        this.setState({ replyLoading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.database().ref(`/feedbacks/${this.props.tpId}`).off();
    this.props.firebase.database().ref(`/replies/${this.props.tpId}`).off();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createFeedback = () => {
    const {
      firebase,
      questId,
      tp,
      tpId,
      uid,
      username,
    } = this.props;
    const { feedback, keys } = this.state;

    const feedbackId = firebase.push(`/feedbacks/${tpId}`).key;
    const notificationId = firebase.push(`/notifications/${tp.creator}`).key;
    const updates = {};

    updates[`/feedbacks/${tpId}/${feedbackId}`] = {
      feedback,
      creator: uid,
      score: 0,
      username,
      date: Date()
    };
    updates[`/feedbackHistory/${uid}/${feedbackId}`] = {
      tpId,
      feedback,
      questId,
      username: tp.username,
      score: 0,
      date: Date()
    };
    // notify TP's creator if current user isn't the creator
    if (uid !== tp.creator) {
      updates[`/notifications/${tp.creator}/${notificationId}`] = {
        questId,
        tpId,
        feedbackId,
        username,
        viewed: false,
        type: 'tpFeedback',
        date: Date(),
      };
      updates[`/hasNotifs/${tp.creator}`] = true;
    }
    this.setState({ feedback: '' });

    // add feedback to top of frozen array of sorted feedbacks in state
    const onComplete = () => {
      keys.unshift(feedbackId);
      this.setState({ keys });
    };

    this.props.firebase.update('/', updates, onComplete);
  };

  upvoteFeedback = (feedbackId) => {
    const { firebase, questId, tpId, tp, uid, username } = this.props;
    const feedbacks = this.state.feedbacks;
    const feedback = feedbacks[feedbackId];
    const updates = {};
    const { isUpvoted, isDownvoted } = currentVotes(feedback, uid);
    const { diff, vote } = getVoteValues(isUpvoted, isDownvoted);

    // notify feedback's creator
    if (!isUpvoted && uid !== feedback.creator) {
      const notificationId = firebase.push(`/notifications/${feedback.creator}`).key;
      updates[`/notifications/${feedback.creator}/${notificationId}`] = {
        questId,
        tpId,
        username,
        viewed: false,
        type: 'tpFeedbackUpvote',
        feedbackId,
        author: tp.username,
        date: Date(),
      };
      updates[`/hasNotifs/${feedback.creator}`] = true;
    }

    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = feedback.score + diff;
    updates[`/feedbackHistory/${feedback.creator}/${feedbackId}/score`] = feedback.score + diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = vote;
    firebase.update('/', updates);
  };

  downvoteFeedback = (feedbackId) => {
    const { firebase, tpId, uid } = this.props;
    const feedbacks = this.state.feedbacks;
    const feedback = feedbacks[feedbackId];
    const updates = {};
    const { isUpvoted, isDownvoted } = currentVotes(feedback, uid);
    const { diff, vote } = getVoteValues(isDownvoted, isUpvoted);

    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = feedback.score - diff;
    updates[`/feedbackHistory/${feedback.creator}/${feedbackId}/score`] = feedback.score - diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = -1 * vote;
    firebase.update('/', updates);
  };

  setReply = (replyFeedbackID, replyToID, toUsername) => {
    this.setState({ 
      replyFeedbackID, 
      replyToID, 
      toUsername,
      reply: "@" + toUsername,
    });
  };

  cancelReply = () => {
    this.setState({
      reply: '',
      replyFeedbackID: null,
      replyToID: null,
      toUsername: null
    });
  };

  createReply = () => {
    const {
      firebase,
      questId,
      tp,
      tpId,
      uid,
      username
    } = this.props;

    const {
      replyKeys,
      reply,
      toUsername,
      replyFeedbackID,
      replyToID
    } = this.state;

    const replyToCreator = replyFeedbackID === replyToID ?
      this.state.feedbacks[replyFeedbackID].creator :
      this.state.replies[replyFeedbackID][replyToID].creator;
    const replyId = firebase.push(`/replies/${tpId}/${replyFeedbackID}`).key;
    const notifId = firebase.push(`/notifications/${replyToCreator}`).key;

    const updates = {};
    updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}`] = {
      creator: uid,
      reply,
      replyToID,
      toUsername,
      username,
      score: 0,
      date: Date()
    };
    updates[`/replyHistory/${uid}/${replyId}`] = {
      tpId,
      reply,
      questId,
      replyFeedbackID,
      username,
      date: Date()
    };
    // notify the creator of the reply/feedback the user is replying to
    if (uid !== replyToCreator) {
      updates[`/notifications/${replyToCreator}/${notifId}`] = {
        questId,
        tpId,
        replyId,
        username,
        author: tp.username,
        viewed: false,
        type: 'reply',
        date: Date(),
      };
      updates[`/hasNotifs/${replyToCreator}`] = true;
    };
    firebase.update('/', updates);

    var replyKeysCopy = { ...replyKeys };

    // add replyId to relevant (by feedbackId) frozen array of replyId in state
    replyKeysCopy[replyFeedbackID] = replyKeys[replyFeedbackID] ?
      replyKeys[replyFeedbackID].slice() : [];
    replyKeysCopy[replyFeedbackID].push(replyId);

    this.setState({
      replyKeys: replyKeysCopy,
      reply: '',
      replyFeedbackID: null,
      replyToID: null,
      toUsername: null
    });
  };

  upvoteReply = (replyId, feedbackId) => {
    const { firebase, questId, tpId, tp, uid, username } = this.props;
    const replies = this.state.replies;
    const reply = replies[feedbackId][replyId];
    const updates = {};
    const isUpvoted = reply.users && reply.users[uid];
    const diff = isUpvoted ? -1 : 1;

    // notify the reply's creator
    if (!isUpvoted && uid !== reply.creator) {
      const notificationId = firebase.push(`/notifications/${reply.creator}`).key;
      updates[`/notifications/${reply.creator}/${notificationId}`] = {
        questId,
        tpId,
        replyId,
        username,
        author: tp.username,
        viewed: false,
        type: 'replyUpvote',
        date: Date(),
      };
      updates[`/hasNotifs/${reply.creator}`] = true;
    }

    updates[`/replies/${tpId}/${feedbackId}/${replyId}/users/${uid}`] = isUpvoted ? false : true;
    updates[`/replies/${tpId}/${feedbackId}/${replyId}/score`] = reply.score + diff;
    firebase.update('/', updates);
  };

  render() {
    const { feedbacks, replies }  = this.state;

    const {
      tp,
      isDownvoted,
      isUpvoted,
      questId,
      uid,
    } = this.props;

    if (!isLoaded(tp)) {
      return <Loading />;
    }

    if (isEmpty(tp)) {
      return <PageNotFound />;
    }

    const feedbacksDisplay =
      feedbacks &&
      this.state.keys.map((feedbackId) => {
        if (feedbacks[feedbackId]) {
          const { creator, feedback, score, username, users, date } = feedbacks[
            feedbackId
          ];
          const deleted = !feedbacks[feedbackId].creator;
          const feedbackUpvoted = users && uid in users && users[uid] === 1;
          const feedbackDownvoted = users && uid in users && users[uid] === -1;
          const feedbackUsername = username ? username : creator;

          // upvote/downvote arrows + score
          const feedbackScoreArrows = !deleted && (
            <div className="centered" sx={ScoreArrowsSx}>
              <div
                className={(feedbackUpvoted ? "upvoted-arrow" : "blank-arrow") + " fa-layers"}
                onClick={() => this.upvoteFeedback(feedbackId)}
              >
                <FontAwesomeIcon icon={faCaretUp} size="3x" />
              </div>
              <div>{score}</div>
              <div
                className={(feedbackDownvoted ? "downvoted-arrow" : "blank-arrow") + " fa-layers"}
                onClick={() => this.downvoteFeedback(feedbackId)}
              >
                <FontAwesomeIcon icon={faCaretDown} size="3x" />
              </div>
            </div>
          );

          const repliesTo = replies && replies[feedbackId];
          const repliesDisplay = this.state.replyKeys[feedbackId] && replies[feedbackId] &&
            this.state.replyKeys[feedbackId].map(replyId => {
              const { reply, toUsername } = repliesTo[replyId];
              const replyCreator = repliesTo[replyId].creator;
              const replyUsername = repliesTo[replyId].username;
              const replyDate = repliesTo[replyId].date;
              const replyDeleted = !replyCreator;
              const isReplyUpvoted = repliesTo[replyId].users && repliesTo[replyId].users[uid];
              if (!replyDeleted) return (
                <div key={replyId} id={replyId} sx={ThreadBoxSx}>
                  <div className="feedback-content-container reply-content-container">
                    {!replyDeleted && 
                      <div sx={ScoreArrowsSx}>
                        {/* upvote arrow + score for reply (only display score if >0) */}
                        <div
                          className={(isReplyUpvoted ? "upvoted-arrow" : "blank-arrow") + " fa-layers"}
                          onClick={() => this.upvoteReply(replyId, feedbackId)}
                        >
                          <FontAwesomeIcon icon={faCaretUp} size="3x" />
                        </div>
                        <div style={{textAlign: 'center'}}>
                          {repliesTo[replyId].score > 0 && repliesTo[replyId].score}
                        </div>
                      </div>
                    }
                    <div className="thread-box-interior">
                      <div className="thread-box-header">
                        <div style={{display: 'flex'}}>
                          <div style={{fontFamily: 'Gotham-Bold'}}>{replyUsername} •{'\xa0'}</div> 
                          <em><Moment fromNow>{tp.date}</Moment></em>
                        </div>
                        <div className="thread-box-options">
                          {/* show delete button if current user wrote the reply */}
                          {uid === replyCreator &&
                            <div
                              onClick={() => replyDelete({
                                firebase: this.props.firebase,
                                tpId: this.props.tpId,
                                replyFeedbackID: feedbackId,
                                replyId,
                                uid: replyCreator,
                              })}
                              className="delete-reply reply-option"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                              {'\xa0'} Delete Reply 
                            </div>
                          }
                          {!replyDeleted && 
                            <div
                              className="reply-option"
                              onClick={() => this.setReply(feedbackId, feedbackId, replyUsername)}
                            >
                              <FontAwesomeIcon icon={faReply} />
                              {'\xa0'} Reply
                            </div>
                          }
                        </div>
                      </div>
                      <div className="thread-box-divider"></div>
                      <div className="thread-box-preview">
                        <Latex>{displayContent(reply)}</Latex>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          
          // reply textArea if replying to feedback or a reply corresponding to the feedbackId
          const replyTextArea = this.state.replyFeedbackID === feedbackId && (
            <div>
              <TextareaAutosize
                className="input-feedback input-reply"
                minRows={2}
                name="reply"
                placeholder="Your reply..."
                onChange={this.handleChange}
                value={this.state.reply}
              />
              <div className="btn-box reply-btn-box">
                <button
                  className="thread-btn cancel-btn"
                  onClick={this.cancelReply}
                >
                  Cancel
                </button>
                <button
                  className="thread-btn"
                  onClick={this.createReply}
                >
                  Reply
                </button>
              </div>
            </div>
          );

          if (!deleted) return (
            <div className="feedback-block" key={feedbackId} id={`${feedbackId}`} sx={ThreadBoxSx}>
              <div className="feedback-content-container">
                <div className="arrows-container">
                  {feedbackScoreArrows}
                </div>
                <div className="thread-box-interior">
                  <div className="thread-box-header">
                    <div style={{display: 'flex'}}>
                      <div style={{fontFamily: 'Gotham-Bold'}}>{feedbackUsername} •{'\xa0'}</div> 
                      <em><Moment fromNow>{tp.date}</Moment></em>
                    </div>
                    <div className="thread-box-options">
                      {/* show delete button if current user wrote the feedback */}
                      {uid === creator &&
                        <div
                          onClick={() => feedbackDelete({
                            firebase: this.props.firebase,
                            tpId: this.props.tpId,
                            feedbackId,
                            uid: creator,
                          })}
                          className="delete-reply"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                          {'\xa0'}Delete Feedback
                        </div>
                      }
                      {!deleted &&
                        <div
                          className="reply-option"
                          onClick={() => this.setReply(feedbackId, feedbackId, feedbackUsername)}
                        >
                          <FontAwesomeIcon icon={faReply} />
                          {'\xa0'} Reply
                        </div>
                      }
                    </div>
                  </div>
                  <div className="thread-box-divider"></div>
                  <div className="thread-box-preview">
                    <Latex>{displayContent(feedback)}</Latex>
                  </div>
                </div>
              </div>
              <br />
              <div className="replies-container">
                {replyTextArea}
                {repliesDisplay}
              </div>
            </div>
          );
        }
        return null;
      });

    // textArea to write feedback directly to the TP (not a reply)
    const myFeedback = this.props.tp.creator && (
      <div style={{marginBottom: '20px',}}>
        <TextareaAutosize
          minRows={2}
          className="input-feedback"
          name="feedback"
          placeholder="Your feedback..."
          onChange={this.handleChange}
          value={this.state.feedback}
        />
        <div className="btn-box">
          <div className="latex-message">
            Use $$latex formula$$ for LaTeX.
          </div>
          <button
            className="thread-btn"
            disabled={this.state.feedback.trim() === ""}
            onClick={this.createFeedback}
          >
            Submit
          </button>
        </div>
      </div>
    );

    // upvote/downvote arrows and score for the TP
    const scoreArrows = this.props.tp.creator && (
      <div className="centered" sx={ScoreArrowsSx}>
        <div
          className={(isUpvoted ? "upvoted-arrow" : "blank-arrow") + " fa-layers"}
          onClick={() => upvoteTp(this.props)}
        >
          <FontAwesomeIcon icon={faCaretUp} size="3x" />
        </div>
        <div>{this.props.tp.total}</div>
        <div
          className={(isDownvoted ? "downvoted-arrow" : "blank-arrow") + " fa-layers"}
          onClick={() => downvoteTp(this.props)}
        >
          <FontAwesomeIcon icon={faCaretDown} size="3x" />
        </div>
      </div>
    );

    return (
      <div sx={TpSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <ReactTitle
          title={`TP by @${tp.username} to #${questId} | Hireglyph`}
        />
        <div className="page-container">
          <div className="tp-header">
            <div className="back-hover" onClick={() => this.props.history.goBack()}>
              <FontAwesomeIcon icon={faAngleLeft} /> Back
            </div>
            <div>
              TP to {' '}
              <Link
                className="question-link"
                to={`/q/${questId}`}
              >
                Question #{questId}
              </Link> {' '}
              by <b style={{fontFamily: 'Open-Sans-Bold'}}>@{tp.username}</b> • {' '}
              <em><Moment fromNow>{tp.date}</Moment></em>
            </div>
            <br />
          </div>
          <div className="tp-body">
            <div className="tp-content-container">
              <div className="arrows-container" style={{ marginTop: '20px' }}>
                {scoreArrows}
              </div>
              <div className="tp-content">
                <div className="tp-content-box">
                  <span className="content-label">
                    {tp.initial && 'Initial: '}
                  </span>
                  <Latex>{tp.initial && displayContent(tp.initial)}</Latex>
                </div>
                <div className="tp-content-box">
                  <span className="content-label">
                    {tp.approach && 'Approach(es) tried: '}
                  </span>
                  <Latex>{tp.approach && displayContent(tp.approach)}</Latex>
                </div>
                <div className="tp-content-box">
                  <span className="content-label">
                    {tp.solution && 'Final solution: '}
                  </span>
                  <Latex>{tp.solution && displayContent(tp.solution)}</Latex>
                </div>
                {/* show delete button if current user wrote the tp */}
                {uid === tp.creator &&
                  <button
                    onClick={() => tpDelete({
                      firebase: this.props.firebase,
                      questId,
                      tpId: this.props.tpId,
                      uid: tp.creator,
                    })}
                  >
                    Delete TP
                  </button>
                }
              </div>
            </div>
          </div>
          {this.state.loading || this.state.replyLoading
            ? <Loading/>
            : (
            <div className="all-feedback-container">
              {/* feedback textArea and feedbacks + replies display */}
              {myFeedback}
              {feedbacksDisplay}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { profile, data } = state.firebase;
  const username = profile && profile.username;
  const tp = data.tp && data.tp[props.questId]
                     && data.tp[props.questId][props.tpId];
  const { isUpvoted, isDownvoted } = currentVotes(tp, props.uid);

  return { isDownvoted, isUpvoted, username, tp };
};

export default compose(
  withRouter,
  firebaseConnect( props =>
    [{
      path: `/tps/${props.questId}/${props.tpId}`,
      storeAs: `/tp/${props.questId}/${props.tpId}`
    }]
  ),
  connect(mapStateToProps)
)(PageTp);
