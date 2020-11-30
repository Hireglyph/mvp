import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageTp.css';
import red from '../assets/images/red-downvote.png';
import green from '../assets/images/green-upvote.png';
import upvote from '../assets/images/upvote.png';
import downvote from '../assets/images/downvote.png';

class PageTp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      feedback: '',
      loading: true,
      keys: [],
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loading && isLoaded(this.props.feedbacks)) {
      let keys = this.props.feedbacks ? Object.keys(this.props.feedbacks) : [];
      keys.sort((a, b) => this.props.feedbacks[b].score - this.props.feedbacks[a].score);

      this.setState({ loading: false, keys });
    }
  }

  handleChange = event => {this.setState({ [event.target.name]: event.target.value });}

  createFeedback = () => {
    const feedbackId = this.props.firebase.push(`/feedbacks/${this.props.tpId}`).key;
    const notificationId = this.props.firebase.push(`/notifications/${this.props.creator}`).key;
    const updates = {};
    const feedback = {
      feedback: this.state.feedback,
      creator: this.props.isLoggedIn,
      score: 0,
      username: this.props.username2,
    };
    updates[`/feedbacks/${this.props.tpId}/${feedbackId}`] = feedback;
    updates[`/feedbackHistory/${this.props.isLoggedIn}/${feedbackId}`] = {tpId: this.props.tpId, feedback: this.state.feedback,
      questId: this.props.questId, username: this.props.username };
    updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, tpId: this.props.tpId, 
        feedbackId: feedbackId, username: this.props.username2, viewed: false, type: 'tpFeedback'};
    this.setState({ feedback: '', })

    const onComplete = () => {
        const keys = this.state.keys;
        keys.unshift(feedbackId);
        this.setState({ keys });
    }

    this.props.firebase.update('/', updates, onComplete);

  }

  upvote = () => {
    const updates = {};
    if(!this.props.isUpvoted && !this.props.isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.creator}`).key;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total + 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, tpId: this.props.tpId, 
        username: this.props.username2, viewed: false, type: 'tpUpvote'};
      this.props.firebase.update('/', updates);
    }

    if(this.props.isUpvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total - 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }

    if(this.props.isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.creator}`).key;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total + 2;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 1
      updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, tpId: this.props.tpId, 
        username: this.props.username2, viewed: false, type: 'tpUpvote'};
      this.props.firebase.update('/', updates);
    }

  }

  downvote = () => {
    const updates = {};
    if(!this.props.isUpvoted && !this.props.isDownvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total - 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(this.props.isUpvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total - 2;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(this.props.isDownvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total + 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }
  }

  upvoteFeedback = feedbackId => {
    const updates = {};
    const isUpvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===1);
    const isDownvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===-1);
    if(!isUpvoted && !isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.feedbacks[feedbackId].creator}`).key;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${this.props.feedbacks[feedbackId].creator}/${notificationId}`] = {questId: this.props.questId, tpId: this.props.tpId, 
        username: this.props.username2, viewed: false, type: 'tpFeedbackUpvote', feedbackId: feedbackId, author: this.props.username};
      this.props.firebase.update('/', updates);
    }
    if(isUpvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 0;
      this.props.firebase.update('/', updates);
    }
    if(isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.feedbacks[feedbackId].creator}`).key;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 2;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${this.props.feedbacks[feedbackId].creator}/${notificationId}`] = {questId: this.props.questId, tpId: this.props.tpId, 
        username: this.props.username2, viewed: false, type: 'tpFeedbackUpvote', feedbackId: feedbackId, author: this.props.username};
      this.props.firebase.update('/', updates);
    }
  }

  downvoteFeedback = feedbackId => {
    const updates = {};
    const isUpvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===1);
    const isDownvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===-1);
    if(!isUpvoted && !isDownvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = -1;
      this.props.firebase.update('/', updates);
    }
    if(isUpvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 2;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = -1;
      this.props.firebase.update('/', updates);
    }
    if(isDownvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 0;
      this.props.firebase.update('/', updates);
    }
  }

	render(){
    if (!isLoaded(this.props.initial) || !isLoaded(this.props.feedbacks)) {
      return (<div>Loading...</div>);
    }

    if(!this.props.isLoggedIn){
      return <Redirect to="/register" />
    }

    if (isEmpty(this.props.initial)){
     return <div>Page not found!</div>;
    }

    const Feedbacks = this.props.feedbacks &&
      this.state.keys.map(feedbackId => {
        const feedback = this.props.feedbacks[feedbackId];
        if (feedback){
          const isUpvoted = feedback.users && (this.props.isLoggedIn in feedback.users) && (feedback.users[this.props.isLoggedIn]===1);
          const isDownvoted = feedback.users && (this.props.isLoggedIn in feedback.users) && (feedback.users[this.props.isLoggedIn]===-1);
          const feedback_username = feedback.username ? feedback.username : feedback.creator;
          return (
              <div className='user-feedback' key={feedbackId}>
                <a id={`${feedbackId}`} > </a>
                <div className='feedback-content'>
                  <div className='feedback-text'>@{feedback_username}</div>
                  <div className='feedback-text'>{feedback.feedback} </div>
                </div>
                <br/>
                <br/>
                <img className='feedback-upvote-button' src={isUpvoted ? green : upvote} onClick={() => this.upvoteFeedback(feedbackId)}/>
                <div className='feedback-score-text'>{feedback.score} </div>
                <img className='feedback-downvote-button' src={isDownvoted ? red : downvote} onClick={() => this.downvoteFeedback(feedbackId)}/>

                <br/>
              </div>
            );
        }
        return;
    });

    const myFeedback = (
      <div>
        <textarea
        className='input-feedback'
        name = "feedback"
        placeholder="Your feedback..."
        onChange = {this.handleChange}
        value={this.state.feedback}
        >feedback here</textarea>
        <br/>
        <button
        className='tp-submit-button'
        disabled={this.state.feedback.trim()===''}
        onClick={this.createFeedback}
        >
        Submit
        </button>
      </div>

    );

		return(
			<div className='full-tp'>
        <div className='question-identification'>@{this.props.username} in response to: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link className='link-to-quest' to={`/q/${this.props.questId}`}> Question #{this.props.questId}</Link></div>
        <br />
  			<div className='label-text'>Initial Thoughts:</div>
        <div className='body-text'>{this.props.initial}</div>
        <br />
  			<div className='label-text'>Approaches Tried:</div>
        <div className='body-text'>{this.props.approach}</div>
        <br />
  			<div className='label-text'>Final Solution:</div>
        <div className='body-text'>{this.props.solution}</div>
        <br />
        <img className='upvote-button' src={this.props.isUpvoted ? green : upvote} onClick={this.upvote}/>
        <div className='score-text'>{this.props.total}</div>
        <img className='downvote-button' src={this.props.isDownvoted ? red : downvote} onClick={this.downvote}/>

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
  const questId = props.match.params.questId;
  const tpId = props.match.params.tpId;
  const tp = state.firebase.data[tpId];
  const username = tp && (tp.username ? tp.username : tp.creator);
  const creator = tp && tp.creator;
  const feedbacks = tpId && state.firebase.data.feedbacks && state.firebase.data.feedbacks[tpId];
  const initial = tp && tp.initial;
  const approach = tp && tp.approach;
  const solution = tp && tp.solution;
  const total = tp && tp.total;
  const isUpvoted = tp && tp.users && (state.firebase.auth.uid in tp.users) && (tp.users[state.firebase.auth.uid] === 1);
  const isDownvoted = tp && tp.users && (state.firebase.auth.uid in tp.users) && (tp.users[state.firebase.auth.uid] === -1);
  const username2 = state.firebase.profile && state.firebase.profile.username;
  return { creator, questId, tpId, initial, approach, solution, isLoggedIn: state.firebase.auth.uid, feedbacks, total, isUpvoted, isDownvoted, username, username2 };
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    const tpId = props.match.params.tpId;

    return [{path: `/tps/${questId}/${tpId}`, storeAs: tpId },
            {path: `/feedbacks/${tpId}` }];
  }),
  connect(mapStateToProps)
)(PageTp);
