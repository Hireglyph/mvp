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
import Loading from 'components/Loading';

const TpSx = {
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
  
  '.tp-header': {
    display: 'flex',
    backgroundColor: 'orange',
    height: '50px',
    lineHeight: '50px',
    gap: '20px',
  },

  '.back-hover': {
    '&:hover': {
      color: 'red',
    },
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
  },

  '.arrows-width': {
    width: '70px',
    marginTop: '20px',
    
  },

  '.score-center': {
    textAlign: 'center',
    marginTop: '5px',
    marginBottom: '5px',
  },

  '.content-label': {

  },

  '.content-text': {
    
  },

  '.input-feedback': {
    width: 'calc(100% - 120px)',
    marginLeft: '60px',
    resize: 'vertical',
    verticalAlign: 'bottom',
    minHeight: '40px',
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
  },

  '.feedback-block': {
    display: 'flex',
    minHeight: '60px',
    marginTop: '30px',
    marginRight: '60px',
  },

  '.feedback-arrows-width': {
    width: '70px',
  },

  '.feedback-content': {
    marginTop: '10px',
    width: '100%',
    fontFamily: 'Gotham-Book',
  },

  '.green-upvote': {
    width: '0px', 
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '15px solid #00FF00',
    position: 'relative',
    left: '-15px',
    bottom: '-2px',
  },

  '.white-upvote': {
    width: '0px', 
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '15px solid #A9A9A9',
    position: 'relative',
    left: '-15px',
    bottom: '-2px',
    '&:hover': {
      borderBottom: '15px solid #00FF00',
    },
  },
  
  '.red-downvote': {
    width: '0px', 
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid red',
    position: 'relative',
    left: '-15px',
    bottom: '17px',
  },

  '.white-downvote': {
    width: '0px', 
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid #A9A9A9',
    position: 'relative',
    left: '-15px',
    bottom: '17px',
    '&:hover': {
      borderTop: '15px solid red',
    },
  },

  '.upvote-border': {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '0px', 
    height: '0px',
    borderLeft: '19px solid transparent',
    borderRight: '19px solid transparent',
    borderBottom: '19px solid black',
  },

  '.downvote-border': {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '0px', 
    height: '0px',
    borderLeft: '19px solid transparent',
    borderRight: '19px solid transparent',
    borderTop: '19px solid black',
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
              <div 
                className='upvote-border'
                onClick={() => this.upvoteFeedback(feedbackId)}
              >
                <div className={feedbackUpvoted ? 'green-upvote' : 'white-upvote'}/>
              </div>
              <div className='score-center'>{score} </div>
              <div
                className='downvote-border'
                onClick={() => this.downvoteFeedback(feedbackId)}
              >
                <div 
                  className={feedbackDownvoted ? 'red-downvote' : 'white-downvote'}
                />
              </div>
            </div>
          ) : (
            null
          );
          return (
            <div className='feedback-block' key={feedbackId} id={`${feedbackId}`}>
              <div className='feedback-arrows-width'>{feedbackScoreArrows}</div>
              <div className='feedback-content'>
                <div>@{feedbackUsername}</div>
                <div>
                  <Latex>{feedback}</Latex>
                </div>
              </div>
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
          className='input-feedback'
          name="feedback"
          placeholder="Enter feedback here"
          onChange={this.handleChange}
          value={this.state.feedback}
        />
        <div className='button-box'>
          <button
            className='submit-button'
            disabled={this.state.feedback.trim() === ""}
            onClick={this.createFeedback}
          >
            Submit
          </button>
        </div>
      </div>
    ) : (
      null
    );

    const scoreArrows = this.props.tp.creator ? (
      <div>
        <div
          className='upvote-border'
          onClick={() => upvoteTp(this.props)}
        >
          <div className={isUpvoted ? 'green-upvote' : 'white-upvote'}/>
        </div>
        <div className='score-center'>{this.props.tp.total}</div>
        <div 
          className='downvote-border'
          onClick={() => downvoteTp(this.props)}
        >
          <div className={isDownvoted ? 'red-downvote' : 'white-downvote'}/>
        </div>
      </div>
    ) : (
      null
    );

    return (
      <div sx={TpSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div className='tp-header'>
          <div className='back-hover' onClick={() => this.props.history.goBack()}>
            &nbsp;&lt;Back
          </div>
          <div>
            TP by @{tp.username} to &nbsp;
            <Link to={`/q/${questId}`}>
              Question #{questId}
            </Link>
          </div>
          <br />
        </div>
        <div className='tp-body'>
          <div className='arrows-width'>{scoreArrows}</div>
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
