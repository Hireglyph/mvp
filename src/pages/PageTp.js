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
import { faArrowCircleLeft,
         faCaretUp,
         faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

import { currentVotes, getVoteValues, upvoteTp, downvoteTp } from 'utils/vote';
import { displayContent } from 'utils/display';
import PageNotFound from 'pages/PageNotFound';
import Loading from 'components/Loading';
import { tpDelete, feedbackDelete, replyDelete } from 'utils/delete';

const TpSx = {
  display: 'flex',

  '.page-container': {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
    paddingBottom: '30px',
    width: '700px',
    height: 'auto',
    background: 'white',
    fontFamily: 'Open-Sans',
  },

  '.tp-header': {
    display: 'flex',
    backgroundColor: 'orange',
    height: '50px',
    lineHeight: '50px',
  },

  '.back-hover': {
    cursor: 'pointer',
    fontSize: '20px',
    width: '60px',
    textAlign: 'center',
    '&:hover': {
      color: '#505050',
    },
  },

  '.question-link': {
    color: 'black',
  },

  '.tp-body': {
    display: 'flex',
    backgroundColor: 'lightGrey',
  },

  '.tp-content': {
    backgroundColor: 'white',
    width: '100%',
    marginRight: '60px',
    marginTop: '20px',
    marginBottom: '20px',
    minHeight: '100px',
    fontFamily: 'Gotham-Book',
    padding: '10px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },

  '.content-label': {
    fontFamily: 'Gotham-Bold'
  },

  '.arrows-container': {
    width: '60px',
  },

  '.centered': {
    textAlign: 'center',
  },

  '.input-feedback': {
    width: 'calc(100% - 120px)',
    padding: '5px',
    marginLeft: '60px',
    resize: 'vertical',
    verticalAlign: 'bottom',
    minHeight: '40px',
    fontFamily: 'Open-Sans',
    lineHeight: '20px',
  },

  '.button-box': {
    width: 'calc(100% - 120px)',
    border: '1px solid #000000',
    marginLeft: '60px',
    textAlign: 'right',
  },

  '.submit-button': {
    verticalAlign: 'bottom',
    height: '30px',
    width: '70px',
    backgroundColor: 'orange',
    color: 'black',
    fontFamily: 'Open-Sans',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
    '&:disabled': {
      backgroundColor: 'darkGrey',
      cursor: 'default',
    },
  },

  '.feedback-block': {
    display: 'flex',
    minHeight: '60px',
    marginTop: '30px',
    marginRight: '60px',
  },

  '.feedback-content': {
    marginTop: '10px',
    width: '100%',
    fontFamily: 'Gotham-Book',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },

  '.feedback-top': {
    display: 'flex',
  },

  '.reply-click': {
    cursor: 'pointer',
  },

  '.cancel-reply': {
    color: 'red',
  },

  '.fa-layers': {
    height: '18px',
    width: '60px',
  },

  '.upvoted-arrow': {
    color: '#00D305',
  },

  '.downvoted-arrow': {
    color: '#E44C4C',
  },

  '.blank-arrow': {
    color: 'white',
  },

  '.fa-caret-up, .fa-caret-down': {
    stroke: 'black',
    strokeWidth: '7',
    transform: 'scaleY(0.8)',
  },
};

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
    this.setState({ replyFeedbackID, replyToID, toUsername });
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
            <div className="centered">
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
              return (
                <div key={replyId} id={replyId}>
                  <div className="feedback-top">
                  <div>@{replyUsername}{' '}</div>
                    <Moment fromNow>{replyDate}</Moment>
                    {!replyDeleted && (this.state.replyToID === replyId ?
                      <div
                        className="reply-click cancel-reply"
                        onClick={() => this.cancelReply()}
                      >
                        Reply
                      </div>
                    :
                      <div
                        className="reply-click"
                        onClick={() => this.setReply(feedbackId, replyId, replyUsername)}
                      >
                        Reply
                      </div>
                    )}
                  </div>
                  <div>
                    {!replyDeleted && <div className="feedback-top">
                      {/* upvote arrow + score for reply (only display score if >0) */}
                      <div
                        className={(isReplyUpvoted ? "upvoted-arrow" : "blank-arrow") + " fa-layers"}
                        onClick={() => this.upvoteReply(replyId, feedbackId)}
                      >
                        <FontAwesomeIcon icon={faCaretUp} size="2x" />
                      </div>
                      <div>{repliesTo[replyId].score > 0 && repliesTo[replyId].score}</div>
                    </div>}
                    <div>
                      @{toUsername}{' '}
                    </div>
                    <Latex>{displayContent(reply)}</Latex>
                  </div>
                  {/* show delete button if current user wrote the reply */}
                  {uid === replyCreator &&
                    <button
                      onClick={() => replyDelete({
                        firebase: this.props.firebase,
                        tpId: this.props.tpId,
                        replyFeedbackID: feedbackId,
                        replyId,
                        uid: replyCreator,
                      })}
                    >
                      Delete Reply
                    </button>
                  }
                </div>
              );
            })
          // reply textArea if replying to feedback or a reply corresponding to the feedbackId
          const replyTextArea = this.state.replyFeedbackID === feedbackId && (
            <div>
              <div>Reply To: {this.state.toUsername}</div>
              <TextareaAutosize
                minRows={2}
                name="reply"
                placeholder="Enter reply here"
                onChange={this.handleChange}
                value={this.state.reply}
              />
              <button
                onClick={this.cancelReply}
              >
                Delete
              </button>
              <button
                onClick={this.createReply}
              >
                Reply
              </button>
            </div>
          );
          return (
            <div className="feedback-block" key={feedbackId} id={`${feedbackId}`}>
              <div className="arrows-container">
                {feedbackScoreArrows}
              </div>
              <div className="feedback-content">
                <div className="feedback-top">
                  <div>@{feedbackUsername}{' '}</div>
                  <Moment fromNow>{date}</Moment>
                  {!deleted && (this.state.replyToID === feedbackId ?
                    <div
                      className="reply-click cancel-reply"
                      onClick={() => this.cancelReply()}
                    >
                      Reply
                    </div>
                  :
                    <div
                      className="reply-click"
                      onClick={() => this.setReply(feedbackId, feedbackId, feedbackUsername)}
                    >
                      Reply
                    </div>
                  )}
                </div>
                <div>
                  <Latex>{displayContent(feedback)}</Latex>
                </div>
                {/* show delete button if current user wrote the feedback */}
                {uid === creator &&
                  <button
                    onClick={() => feedbackDelete({
                      firebase: this.props.firebase,
                      tpId: this.props.tpId,
                      feedbackId,
                      uid: creator,
                    })}
                  >
                    Delete Feedback
                  </button>
                }
                <div>
                  {repliesDisplay}
                  {replyTextArea}
                </div>
              </div>
              <br />
            </div>
          );
        }
        return null;
      });

    // textArea to write feedback directly to the TP (not a reply)
    const myFeedback = this.props.tp.creator && (
      <div>
        <TextareaAutosize
          minRows={2}
          className="input-feedback"
          name="feedback"
          placeholder="Enter feedback here"
          onChange={this.handleChange}
          value={this.state.feedback}
        />
        <div className="button-box">
          <button
            className="submit-button"
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
      <div className="centered">
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
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </div>
            <div>
              TP by @{tp.username} to {' '}
              <Link
                className="question-link"
                to={`/q/${questId}`}
              >
                Question #{questId}
              </Link> {' '}
              <Moment fromNow>{tp.date}</Moment>
            </div>
            <br />
          </div>
          <div className="tp-body">
            <div className="arrows-container" style={{ marginTop: '20px' }}>
              {scoreArrows}
            </div>
            <div className="tp-content">
              <div className="content-label">
                {tp.initial && 'Initial Thoughts:'}
              </div>
              <div>
                <Latex>{tp.initial && displayContent(tp.initial)}</Latex>
              </div>
              <div className="content-label">
                {tp.approach && 'Approaches Tried:'}
              </div>
              <div>
                <Latex>{tp.approach && displayContent(tp.approach)}</Latex>
              </div>
              <div className="content-label">
                {tp.solution && 'Final Solution:'}
              </div>
              <div>
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
          <br />
          {this.state.loading || this.state.replyLoading
            ? <Loading/>
            : (
            <div>
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
