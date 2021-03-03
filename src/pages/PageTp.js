/** @jsx jsx */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import Latex from 'react-latex';
import TextareaAutosize from 'react-textarea-autosize';

import { currentVotes, getVoteValues, upvoteTp, downvoteTp } from 'utils/vote';

import PageNotFound from 'pages/PageNotFound';
import red from 'assets/images/red-downvote.png';
import green from 'assets/images/green-upvote.png';
import upvote from 'assets/images/upvote.png';
import downvote from 'assets/images/downvote.png';
import Loading from 'components/Loading';

import "../styles/PageTp.css";

const TpSx = {
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '70%',
  maxWidth: '800px',
  height: 'auto',
  background: 'white',
  
  '.tp-header': {
    display: 'flex',
    backgroundColor: 'orange',
    height: '50px',
    lineHeight: '50px',
    gap: '40px',
  },

  '.tp-body': {
    display: 'flex',
    backgroundColor: 'lightGrey',
    padding: '20px',
    gap: '20px',
  },

  '.tp-content': {
    backgroundColor: 'white',
    width: '100%'
  },

  '.score-center': {
    textAlign: 'center',
  },

  '.content-label': {

  },

  '.content-text': {
    
  },

};

class PageTp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
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
    };
    updates[`/feedbackHistory/${uid}/${feedbackId}`] = {
      tpId,
      feedback,
      questId,
      username: tp.username,
      score: 0,
    };
    updates[`/notifications/${tp.creator}/${notificationId}`] = {
      questId,
      tpId,
      feedbackId,
      username,
      viewed: false,
      type: "tpFeedback",
    };
    updates[`/hasNotifs/${tp.creator}`] = true;
    this.setState({ feedback: "" });

    const onComplete = () => {
      keys.unshift(feedbackId);
      this.setState({ keys });
    };

    this.props.firebase.update("/", updates, onComplete);
  };

  upvoteFeedback = (feedbackId) => {
    const { feedbacks, firebase, questId, tpId, tp, uid, username } = this.props;
    const feedback = feedbacks[feedbackId];
    const updates = {};
    const { isUpvoted, isDownvoted } = currentVotes(feedback, uid);
    const { diff, vote } = getVoteValues(isUpvoted, isDownvoted);

    if (!isUpvoted) {
      const notificationId = firebase.push(`/notifications/${feedback.creator}`).key;
      updates[`/notifications/${feedback.creator}/${notificationId}`] = {
        questId,
        tpId,
        username,
        viewed: false,
        type: "tpFeedbackUpvote",
        feedbackId,
        author: tp.username,
      };
      updates[`/hasNotifs/${feedback.creator}`] = true;
    }

    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = feedback.score + diff;
    updates[`/feedbackHistory/${feedback.creator}/${feedbackId}/score`] = feedback.score + diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = vote;
    firebase.update("/", updates);
  };

  downvoteFeedback = (feedbackId) => {
    const { feedbacks, firebase, tpId, uid } = this.props;
    const feedback = feedbacks[feedbackId];
    const updates = {};
    const { isUpvoted, isDownvoted } = currentVotes(feedback, uid);
    const { diff, vote } = getVoteValues(isDownvoted, isUpvoted);

    updates[`/feedbacks/${tpId}/${feedbackId}/score`] = feedback.score - diff;
    updates[`/feedbackHistory/${feedback.creator}/${feedbackId}/score`] = feedback.score - diff;
    updates[`/feedbacks/${tpId}/${feedbackId}/users/${uid}`] = -1 * vote;
    firebase.update("/", updates);
  };

  render() {
    const {
      tp,
      feedbacks,
      isDownvoted,
      isUpvoted,
      questId,
      uid,
    } = this.props;

    if (!isLoaded(feedbacks) || this.state.loading) {
      return <Loading />;
    }

    if (isEmpty(tp)) {
      return <PageNotFound />;
    }

    const Feedbacks =
      feedbacks &&
      this.state.keys.map((feedbackId) => {
        if (feedbacks[feedbackId]) {
          const { creator, feedback, score, username, users } = feedbacks[
            feedbackId
          ];
          const deleted = !feedbacks[feedbackId].creator;
          const feedbackUpvoted = users && uid in users && users[uid] === 1;
          const feedbackDownvoted = users && uid in users && users[uid] === -1;
          const feedbackUsername = username ? username : creator;
          const feedbackScoreArrows = !deleted ? (
            <div>
              <img
                alt="upvote"
                className="feedback-upvote-button"
                src={feedbackUpvoted ? green : upvote}
                onClick={() => this.upvoteFeedback(feedbackId)}
              />
              <div className="feedback-score-text">{score} </div>
              <img
                alt="downvote"
                className="feedback-downvote-button"
                src={feedbackDownvoted ? red : downvote}
                onClick={() => this.downvoteFeedback(feedbackId)}
              />
            </div>
          ) : (
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

    const myFeedback = this.props.tp.creator ? (
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
    ) : (
      <div></div>
    );

    const scoreArrows = this.props.tp.creator ? (
      <div>
        <img
          alt="upvote"
          src={isUpvoted ? green : upvote}
          onClick={() => upvoteTp(this.props)}
        />
        <div className='score-center'>{this.props.tp.total}</div>
        <img
          alt="downvote"
          src={isDownvoted ? red : downvote}
          onClick={() => downvoteTp(this.props)}
        />
      </div>
    ) : (
      <div></div>
    );

    return (
      <div sx={TpSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div className='tp-header'>
          <div onClick={() => this.props.history.goBack()}>Back</div>
          <div>
            TP by @{tp.username} in response to:
            <Link to={`/q/${questId}`}>
              Question #{questId}
            </Link>
          </div>
          <br />
        </div>
        <div className='tp-body'>
          {scoreArrows}
          <div className='tp-content'>
            <div className="content-label">
              {tp.initial ? "Initial Thoughts:" : ""}
            </div>
            <div className="content-text">
              <Latex>{tp.initial}</Latex>
            </div>
            <div className="content-label">
              {tp.approach ? "Approaches Tried:" : ""}
            </div>
            <div className="content-text">
              <Latex>{tp.approach}</Latex>
            </div>
            <div className="content-label">
              {tp.solution ? "Final Solution:" : ""}
            </div>
            <div className="content-text">
              <Latex>{tp.solution}</Latex>
            </div>
          </div>
        </div>
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
  const { data, profile } = state.firebase;
  const { tpId } = props.match.params;

  const { isUpvoted, isDownvoted } = currentVotes(props.tp, props.uid);
  const feedbacks = data.feedbacks && data.feedbacks[tpId];
  const username = profile && profile.username;

  return { feedbacks, isDownvoted, isUpvoted, username };
};

export default compose(
  withRouter,
  firebaseConnect(props =>
    [{ path: `/feedbacks/${props.match.params.tpId}` }]
  ),
  connect(mapStateToProps)
)(PageTp);
