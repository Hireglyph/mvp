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

class PageSa extends React.Component{
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

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  createFeedback = () => {
    const feedbackId = this.props.firebase.push(`/feedbacks/${this.props.saId}`).key;
    const notificationId = this.props.firebase.push(`/notifications/${this.props.creator}`).key;
    const updates = {};
    const feedback = {
      feedback: this.state.feedback,
      creator: this.props.isLoggedIn,
      score: 0,
      username: this.props.username2,
    };
    updates[`/feedbacks/${this.props.saId}/${feedbackId}`] = feedback;
    updates[`/feedbackHistory/${this.props.isLoggedIn}/${feedbackId}`] = {saId: this.props.saId, feedback: this.state.feedback,
      questId: this.props.questId, username: this.props.username };
    updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, saId: this.props.saId, 
        feedbackId: feedbackId, username: this.props.username2, viewed: false, type: 'saFeedback'};
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
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total + 1;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = 1
      updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, saId: this.props.saId, 
        username: this.props.username2, viewed: false, type: 'saUpvote'};
      this.props.firebase.update('/', updates);
    }

    if(this.props.isUpvoted){
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total - 1;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }

    if(this.props.isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.creator}`).key;
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total + 2;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = 1
      updates[`/notifications/${this.props.creator}/${notificationId}`] = {questId: this.props.questId, saId: this.props.saId, 
        username: this.props.username2, viewed: false, type: 'saUpvote'};
      this.props.firebase.update('/', updates);
    }

  }

  downvote = () => {
    const updates = {};
    if(!this.props.isUpvoted && !this.props.isDownvoted){
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total - 1;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(this.props.isUpvoted){
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total - 2;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(this.props.isDownvoted){
      updates[`/sas/${this.props.questId}/${this.props.saId}/total`] = this.props.total + 1;
      updates[`/sas/${this.props.questId}/${this.props.saId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }
  }

  upvoteFeedback = feedbackId => {
    const updates = {};
    const isUpvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===1);
    const isDownvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===-1);
    if(!isUpvoted && !isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.feedbacks[feedbackId].creator}`).key;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 1;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${this.props.feedbacks[feedbackId].creator}/${notificationId}`] = {questId: this.props.questId, saId: this.props.saId, 
        username: this.props.username2, viewed: false, type: 'saFeedbackUpvote', feedbackId: feedbackId, author: this.props.username};
      this.props.firebase.update('/', updates);
    }
    if(isUpvoted){
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 1;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 0;
      this.props.firebase.update('/', updates);
    }
    if(isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${this.props.feedbacks[feedbackId].creator}`).key;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 2;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${this.props.feedbacks[feedbackId].creator}/${notificationId}`] = {questId: this.props.questId, saId: this.props.saId, 
        username: this.props.username2, viewed: false, type: 'saFeedbackUpvote', feedbackId: feedbackId, author: this.props.username};
      this.props.firebase.update('/', updates);
    }
  }

  downvoteFeedback = feedbackId => {
    const updates = {};
    const isUpvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===1);
    const isDownvoted = this.props.feedbacks[feedbackId].users && (this.props.isLoggedIn in this.props.feedbacks[feedbackId].users) && (this.props.feedbacks[feedbackId].users[this.props.isLoggedIn]===-1);
    if(!isUpvoted && !isDownvoted){
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 1;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = -1;
      this.props.firebase.update('/', updates);
    }
    if(isUpvoted){
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 2;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = -1;
      this.props.firebase.update('/', updates);
    }
    if(isDownvoted){
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 1;
      updates[`/feedbacks/${this.props.saId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 0;
      this.props.firebase.update('/', updates);
    }
  }

	render(){
    if (!isLoaded(this.props.answer) || !isLoaded(this.props.feedbacks)) {
      return (<div>Loading...</div>);
    }

    if(!this.props.isLoggedIn){
      return <Redirect to="/register" />
    }

    if (isEmpty(this.props.answer)){
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
        <div className='question-identification'>@{this.props.username} in response to: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link className='link-to-quest' to={`/eq/${this.props.questId}`}> Question #{this.props.questId}</Link></div>
        <br />
  			<div className='label-text'>Short Answer:</div>
        <div className='body-text'>{this.props.answer}</div>
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
  const saId = props.match.params.saId;
  const sa = state.firebase.data[saId];
  const username = sa && (sa.username ? sa.username : sa.creator);
  const creator = sa && sa.creator;
  const feedbacks = saId && state.firebase.data.feedbacks && state.firebase.data.feedbacks[saId];
  const answer = sa && sa.answer;
  const total = sa && sa.total;
  const isUpvoted = sa && sa.users && (state.firebase.auth.uid in sa.users) && (sa.users[state.firebase.auth.uid] === 1);
  const isDownvoted = sa && sa.users && (state.firebase.auth.uid in sa.users) && (sa.users[state.firebase.auth.uid] === -1);
  const username2 = state.firebase.profile && state.firebase.profile.username;
  return { creator, questId, saId, answer, isLoggedIn: state.firebase.auth.uid, feedbacks, total, isUpvoted, isDownvoted, username, username2 };
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    const saId = props.match.params.saId;

    return [{path: `/sas/${questId}/${saId}`, storeAs: saId },
            {path: `/feedbacks/${saId}` }];
  }),
  connect(mapStateToProps)
)(PageSa);
