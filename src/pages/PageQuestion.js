import React from 'react';
import TpPreview from '../components/TpPreview.js';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import red from '../assets/images/red-downvote.png';
import green from '../assets/images/green-upvote.png';
import upvote from '../assets/images/upvote.png';
import downvote from '../assets/images/downvote.png';
import '../styles/PageQuestion.css'

class PageQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isMyTps: true,
      initial: '',
      approach: '',
      solution: '',
      loading: true,
      orderByTop: true,
      keys: [],
      time: [],
      expand: {},
      showAnswer: false,
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loading && isLoaded(this.props.tps)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);
      this.setState({ loading: false, keys, });
      if (this.props.tps) {
        let list = {};
        Object.keys(this.props.tps).map(tpId => {
          list[tpId] = false;
          return;
        });
        this.setState({ time: Object.keys(this.props.tps).reverse(), expand: list })
      }
    }
  }

  upvoteTp = (tpId, isUpvoted, isDownvoted) => {
    const updates = {};
    const creator = this.props.tps[tpId].creator;
    const total = this.props.tps[tpId].total;
    if(!isUpvoted && !isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${creator}`).key;
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total + 1;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = 1;
      updates[`/notifications/${creator}/${notificationId}`] = {questId: this.props.questId, tpId: tpId,
        username: this.props.username, viewed: false, type: 'tpUpvote'};
      updates[`/hasNotifs/${creator}`] = true;
      this.props.firebase.update('/', updates);
    }

    if(isUpvoted){
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total - 1;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }

    if(isDownvoted){
      const notificationId = this.props.firebase.push(`/notifications/${creator}`).key;
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total + 2;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = 1
      updates[`/notifications/${creator}/${notificationId}`] = {questId: this.props.questId, tpId: tpId,
        username: this.props.username, viewed: false, type: 'tpUpvote'};
      updates[`/hasNotifs/${creator}`] = true;
      this.props.firebase.update('/', updates);
    }

  }

  downvoteTp = (tpId, isUpvoted, isDownvoted) => {
    const updates = {};
    const creator = this.props.tps[tpId].creator;
    const total = this.props.tps[tpId].total;
    if(!isUpvoted && !isDownvoted){
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total - 1;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(isUpvoted){
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total - 2;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = -1
      this.props.firebase.update('/', updates);
    }

    if(isDownvoted){
      updates[`/tps/${this.props.questId}/${tpId}/total`] = total + 1;
      updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = 0
      this.props.firebase.update('/', updates);
    }
  }


  displayTp = tpId => {
    const tp = this.props.tps[tpId];
    const username = tp && (tp.username ? tp.username : tp.creator);
    const expanded = this.state.expand[tpId];
    const isUpvoted = tp.users && (this.props.isLoggedIn in tp.users) && (tp.users[this.props.isLoggedIn]===1);
    const isDownvoted = tp.users && (this.props.isLoggedIn in tp.users) && (tp.users[this.props.isLoggedIn]===-1);
    if (expanded && tp.initial && tp.approach) {
      return (
        <div className='individual-tp-preview' key={tpId}> 
          <div className='main-tp-text'>
            <div className='tp-preview-username'>@{username}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initial:</span><span className='tp-preview-tail'> {tp.initial}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Approaches:</span><span className='tp-preview-tail'>  {tp.approach}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution}</span></div>

            <div className='align-right'>
            <div onClick={() => this.changeExpand(tpId, false)}>Collapse TP</div>
            <Link className='tp-full-goto' to={`/tp/${this.props.questId}/${tpId}`}>
              Go to full TP
            </Link>
          </div>
          </div>
          <img className='feedback-upvote-button' src={isUpvoted ? green : upvote} onClick={() => this.upvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <div className='feedback-score-text'>{tp.total}</div>
          <img className='feedback-downvote-button' src={isDownvoted ? red : downvote} onClick={() => this.downvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <br />
        </div>
      );
    }
    if (!expanded && tp.initial && tp.approach) {
      return (
        <div className='individual-tp-preview' key={tpId}> 
          <div className='main-tp-text'>
            <div className='tp-preview-username'>@{username}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initial:</span><span className='tp-preview-tail'> {tp.initial.slice(0,45)}...</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Approaches:</span><span className='tp-preview-tail'>  {tp.approach.slice(0,45)}...</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution.slice(0,45)}...</span></div>

            <div className='align-right'>
            <div onClick={() => this.changeExpand(tpId, true)}>Expand TP</div>
            <Link className='tp-full-goto' to={`/tp/${this.props.questId}/${tpId}`}>
              Go to full TP
            </Link>
          </div>
          </div>
          <img className='feedback-upvote-button' src={isUpvoted ? green : upvote} onClick={() => this.upvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <div className='feedback-score-text'>{tp.total}</div>
          <img className='feedback-downvote-button' src={isDownvoted ? red : downvote} onClick={() => this.downvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <br />
        </div>
      );
    }
    if (expanded && !tp.initial && !tp.approach) {
      return (
        <div className='individual-tp-preview' key={tpId}> 
          <div className='main-tp-text'>
            <div className='tp-preview-username'>@{username}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution}</span></div>

            <div className='align-right'>
            <div onClick={() => this.changeExpand(tpId, false)}>Collapse TP</div>
            <Link className='tp-full-goto' to={`/tp/${this.props.questId}/${tpId}`}>
              Go to full TP
            </Link>
          </div>
          </div>
          <img className='feedback-upvote-button' src={isUpvoted ? green : upvote} onClick={() => this.upvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <div className='feedback-score-text'>{tp.total}</div>
          <img className='feedback-downvote-button' src={isDownvoted ? red : downvote} onClick={() => this.downvoteTp(tpId, isUpvoted, isDownvoted)}/>
          <br />
        </div>
      );
    }
    return (
      <div className='individual-tp-preview' key={tpId}> 
        <div className='main-tp-text'>
          <div className='tp-preview-username'>@{username}</div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution.slice(0,45)}...</span></div>

          <div className='align-right'>
          <div onClick={() => this.changeExpand(tpId, true)}>Expand TP</div>
          <Link className='tp-full-goto' to={`/tp/${this.props.questId}/${tpId}`}>
            Go to full TP
          </Link>
        </div>
        </div>
        <img className='feedback-upvote-button' src={isUpvoted ? green : upvote} onClick={() => this.upvoteTp(tpId, isUpvoted, isDownvoted)}/>
        <div className='feedback-score-text'>{tp.total}</div>
        <img className='feedback-downvote-button' src={isDownvoted ? red : downvote} onClick={() => this.downvoteTp(tpId, isUpvoted, isDownvoted)}/>
        <br />
      </div>
    );
  }

  changeOrder = () => {
    this.setState({ orderByTop: !this.state.orderByTop });
  }

  changeShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  changeExpand = (tpId, value) => {
    this.setState({ expand: Object.assign(this.state.expand, {[tpId]: value}) })
  }

  handleTps = () => {
    this.setState({ isMyTps: !this.state.isMyTps });
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  createTp = () => {
    const questId = this.props.questId
    const uid = this.props.isLoggedIn;
    const tpId = this.props.firebase.push(`/tps/${questId}`).key;
    const updates = {};
    const tp = this.props.difficulty === 'easy'
    ? 
    {
      solution: this.state.solution,
      creator: uid,
      username: this.props.username,
      total: 0
    }
    :
    {
      initial: this.state.initial,
      approach: this.state.approach,
      solution: this.state.solution,
      creator: uid,
      username: this.props.username,
      total: 0
    };
    const tp2 = this.props.difficulty === 'easy' 
    ?
    {
      questId: questId,
      solution: this.state.solution,
    }
    :
    {
      questId: questId,
      initial: this.state.initial,
      approach: this.state.approach,
      solution: this.state.solution,
    };

    updates[`/tps/${questId}/${tpId}`] = tp;
    updates[`/tpHistory/${uid}/${tpId}`] = tp2;
    updates[`/questionHistory/${uid}/${questId}`] = true;

    const onComplete = () => {
      this.props.history.push(`/tp/${questId}/${tpId}`);
    }
    this.props.firebase.update('/', updates, onComplete);
  }

  render() {
    if (!isLoaded(this.props.title) || !isLoaded(this.props.tps)) {
      return (<div>Loading...</div>);
    }

    if (isEmpty(this.props.title)){
      return <div>Page not found!</div>;
    }

    const topics = this.props.tags &&
      Object.keys(this.props.tags).map(tag => {
        return (
          <span className='topic-2' key={tag}>{tag} </span>
        );
    });

    const answer = this.props.answer && 
      (<div>
        <div onClick={() => this.changeShowAnswer()}>Click to see answer</div>
        <div>{this.state.showAnswer ? this.props.answer : ""}</div>
      </div>);

    let bars;
    if (this.props.difficulty && this.props.difficulty === 'easy') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2n2'></div>
          <div className='level3n2'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'medium') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2y2'></div>
          <div className='level3n2'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'hard') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2y2'></div>
          <div className='level3y2'></div>
        </div>
      );
    }

    const Tps = this.props.tps &&
      this.state.keys.map(tpId => {
        return(this.displayTp(tpId));
    });

    const tpsByTime = this.props.tps &&
      this.state.time.map(tpId => {
        return(this.displayTp(tpId));
    });

    const communityTps = (
      <div>
        <button
          disabled={this.state.orderByTop}
          onClick={() => this.changeOrder(1)}
        >
          Top TPs
        </button>
        <button
          disabled={!this.state.orderByTop}
          onClick={() => this.changeOrder(2)}
        >
          New TPs
        </button>
        {this.state.orderByTop ? Tps : tpsByTime}
      </div>
    );

    const myTp = (
      this.props.difficulty === 'easy'
      ?
      <div className='my-tp-submit'>
        <p className='tp-instructions-text'>Enter your Thought Process below:</p>
        <textarea
        className='tp-input-box'
        name = "solution"
        placeholder="Final solution!"
        onChange = {this.handleChange}
        value={this.state.solution}
        />
        <br />
        <br />
        <button
        className='tp-submit-green'
        disabled=
        {this.state.solution.trim()===''}
        onClick={this.createTp}
        >
        Submit
        </button>
      </div>
      :
      <div className='my-tp-submit'>
        <p className='tp-instructions-text'>Enter your Thought Process below:</p>
        <textarea
        className='tp-input-box'
        name = "initial"
        placeholder="What were your initial thoughts?"
        onChange = {this.handleChange}
        value={this.state.initial}
        />

        <textarea
        className='tp-input-box'
        name = "approach"
        placeholder="Different approaches you tried..."
        onChange = {this.handleChange}
        value={this.state.approach}
        />

        <textarea
        className='tp-input-box'
        name = "solution"
        placeholder="Final solution!"
        onChange = {this.handleChange}
        value={this.state.solution}
        />
        <br />
        <br />
        <button
        className='tp-submit-green'
        disabled=
        {this.state.initial.trim()===''||this.state.approach.trim()===''||this.state.solution.trim()===''}
        onClick={this.createTp}
        >
        Submit
        </button>
      </div>

    );

    let section;
    if (this.state.isMyTps) {
      section = myTp;
    }
    else {
      section = communityTps;
    }

    if (!this.props.isLoggedIn) {
      section = (
        <div className='login-message'>
          <p>You need to log in or register to view TPs or write your own.</p>
        </div>
      );
    }

    return(
      <div>
        <div className='question-block'>
          <div className='question-title-2'>
              <h1>#{this.props.questId}: {this.props.title}</h1>
          </div>
          <div className='question-description'>
            <p>{this.props.description}</p>
          </div>
          <div>{bars}</div>
          <div className='topics-2'>{topics}</div>
          <div>{answer}</div>
        </div>
        <div>
          <button
            className='my-tp-button-1'
            disabled={this.state.isMyTps}
            onClick={() => this.handleTps()}
          >
              My TP
          </button>
          <button
            className='community-tp-button-1'
            disabled={!this.state.isMyTps}
            onClick={() => this.handleTps()}
          >
              Community TPs
          </button>
          <hr className={this.state.isMyTps ? 'divider-line' : 'divider-line-2'}/>
        </div>
        <div className={this.state.isMyTps ? 'px-break' : 'px-break-2'}>
          {section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId
  const question = state.firebase.data[questId];

  const title = question && question.title;
  const description = question && question.description;
  const definitive = question && question.definitive;
  const topics = question && question.topics;
  const tags = question && question.tags;
  const difficulty = question && question.difficulty;
  const answer = question && question.answer;

  const tps = question && state.firebase.data.tps && state.firebase.data.tps[questId];
  const username = state.firebase.profile && state.firebase.profile.username;
  return { questId, title, description, definitive, topics, difficulty, answer, tps, username, isLoggedIn: state.firebase.auth.uid, tags};

}

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??
export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}` } ];
  }),
  connect(mapStateToProps)
)(PageQuestion);

