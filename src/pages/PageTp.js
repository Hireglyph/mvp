import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
    if (prevState.loading && this.props.feedbacks) {
      let keys = this.props.feedbacks ? Object.keys(this.props.feedbacks) : [];
      keys.sort((a, b) => this.props.feedbacks[b].score - this.props.feedbacks[a].score);

      this.setState({ loading: false, keys });
      //console.log("meep");
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  createFeedback = () => {
    const feedbackId = this.props.firebase.push(`/feedbacks/${this.props.tpId}`).key;
    const updates = {};
    const feedback = {
      feedback: this.state.feedback,
      creator: this.props.isLoggedIn,
      score: 0
    };
    updates[`/feedbacks/${this.props.tpId}/${feedbackId}`] = feedback;
    this.setState({ feedback: '', })

    const onComplete = () => {
      if( this.state.keys[0] && this.state.keys[0] != feedbackId ) {
        //console.log( (feedbackId in this.state.keys) );
        //console.log(this.state.keys);
        //console.log(feedbackId);
        
        const keys = this.state.keys;
        keys.unshift(feedbackId);
        this.setState({ keys });
        
        //console.log(this.state.keys);
        //console.log("bop");
      }
    }

    this.props.firebase.update('/', updates, onComplete);

  }

  upvote = () => {
    const updates = {};
    if(!this.props.isUpvoted && !this.props.isDownvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total + 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 1
      this.props.firebase.update('/', updates);
    }

    if(this.props.isUpvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total - 1;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }

    if(this.props.isDownvoted){
      updates[`/tps/${this.props.questId}/${this.props.tpId}/total`] = this.props.total + 2;
      updates[`/tps/${this.props.questId}/${this.props.tpId}/users/${this.props.isLoggedIn}`] = 1
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
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
      this.props.firebase.update('/', updates);
    }
    if(isUpvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score - 1;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 0;
      this.props.firebase.update('/', updates);
    }
    if(isDownvoted){
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/score`] = this.props.feedbacks[feedbackId].score + 2;
      updates[`/feedbacks/${this.props.tpId}/${feedbackId}/users/${this.props.isLoggedIn}`] = 1;
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

    // if(this.state.loading) {
    //   this.sortKeys();
    // }

    const Feedbacks = this.props.feedbacks &&
      this.state.keys.map(feedbackId => {
        //console.log(feedbackId);
        //console.log(this.state.keys);
        //console.log(this.props.feedbacks);
        //console.log(feedbackId);
        const feedback = this.props.feedbacks[feedbackId];
        //console.log(feedback);
        if (feedback){
          return (
              <div key={feedbackId}>
                <p>Feedback by: @{feedback.creator.username}</p>
                <p>Feedback: {feedback.feedback} </p>
                <p>Score: {feedback.score} </p>
                <div>
                  <button onClick={() => this.upvoteFeedback(feedbackId)}> ↑ </button>
                  <button onClick={() => this.downvoteFeedback(feedbackId)}> ↓ </button>
                </div>
              </div>
            );
        }
        return;
    });

    const myFeedback = (
      <div>
        <input
        name = "feedback"
        placeholder="Your feedback..."
        onChange = {this.handleChange}
        value={this.state.feedback}
        />
        <br/>
        <br />
        <button
        disabled={this.state.feedback.trim()===''}
        onClick={this.createFeedback}
        >
        Submit
        </button>
      </div>

      );

		return(
			<div>
        <div>TP created by: @{this.props.username}</div>
  			<div>Initial thoughts: {this.props.initial}</div>
  			<div>Approaches tried: {this.props.approach}</div>
  			<div>Final solution: {this.props.solution}</div>
        <div>Score: {this.props.total}</div>
        <div>
          <button onClick={this.upvote}> ↑ </button>
          <button onClick={this.downvote}> ↓ </button>
        </div>
        <hr />
        <div> {myFeedback}</div>
        <hr />
        <div>{Feedbacks}</div>
        <Link to={`/q/${this.props.questId}`}>Back to Question "{this.props.questId}"</Link>
        <br />
        <Link to="/">Home</Link>
			</div>
		);
	}
}


const populates =
  [{child: 'creator', root: 'users'}];

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId;
  const tpId = props.match.params.tpId;
  //const tp = state.firebase.data[tpId];
  const tp = populate(state.firebase, tpId, populates)
  const username = tp && tp.creator && tp.creator.username;
  //const feedbacks = tpId && state.firebase.data.feedbacks && state.firebase.data.feedbacks[tpId];
  const feedbacks = tpId && populate(state.firebase, `/feedbacks/${tpId}`, populates);
  const initial = tp && tp.initial;
  const approach = tp && tp.approach;
  const solution = tp && tp.solution;
  const total = tp && tp.total;
  const isUpvoted = tp && tp.users && (state.firebase.auth.uid in tp.users) && (tp.users[state.firebase.auth.uid] === 1);
  const isDownvoted = tp && tp.users && (state.firebase.auth.uid in tp.users) && (tp.users[state.firebase.auth.uid] === -1);
  return { questId, tpId, initial, approach, solution, isLoggedIn: state.firebase.auth.uid, questId, feedbacks, total, isUpvoted, isDownvoted, username };
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    const tpId = props.match.params.tpId;

    return [ //{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}/${tpId}`, storeAs: tpId, populates } ,
            {path: `/feedbacks/${tpId}`, populates}];
  }),
  connect(mapStateToProps)
)(PageTp);
