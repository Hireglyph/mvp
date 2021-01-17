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
import Latex from 'react-latex';

import '../styles/PageQuestion.css';

class PageQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initial: '',
      approach: '',
      solution: '',
      loading: true,
      keys: [],
      time: [],
      expand: {},
      showAnswer: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
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

  getVoteValues = (isSameVoted, isOppositeVoted) => {
    let diff = -1, vote = 0;
    if (!isSameVoted) {
      vote = 1;
      diff = isOppositeVoted ? 2 : 1;
    }
    return { diff, vote }
  }

  upvoteTp = (tpId, isUpvoted, isDownvoted) => {
    const updates = {};
    const creator = this.props.tps[tpId].creator;
    const total = this.props.tps[tpId].total;
    const { diff, vote } = this.getVoteValues(isUpvoted, isDownvoted);

    if (!isUpvoted) {
      const notificationId = this.props.firebase.push(`/notifications/${creator}`).key;
      updates[`/notifications/${creator}/${notificationId}`] = {
        questId: this.props.questId,
        tpId: tpId,
        username: this.props.username,
        viewed: false,
        type: 'tpUpvote'
      };
      updates[`/hasNotifs/${creator}`] = true;
    }

    updates[`/tps/${this.props.questId}/${tpId}/total`] = total + diff;
    updates[`/tpHistory/${creator}/${tpId}/total`] = total + diff;
    updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = vote;
    this.props.firebase.update('/', updates);

  }

  downvoteTp = (tpId, isUpvoted, isDownvoted) => {
    const updates = {};
    const creator = this.props.tps[tpId].creator;
    const total = this.props.tps[tpId].total;
    const { diff, vote } = this.getVoteValues(isDownvoted, isUpvoted);

    updates[`/tps/${this.props.questId}/${tpId}/total`] = total - diff;
    updates[`/tpHistory/${creator}/${tpId}/total`] = total - diff;
    updates[`/tps/${this.props.questId}/${tpId}/users/${this.props.isLoggedIn}`] = -1 * vote;
    this.props.firebase.update('/', updates);
  }

  generateMessage = (isExpanded, tpId) => {
    if (!isExpanded) {
      return <div onClick={() => this.changeExpand(tpId, true)}>Expand TP</div>
    }
    return <div onClick={() => this.changeExpand(tpId, false)}>Collapse TP</div>
  }


  displayTp = tpId => {
    const tp = this.props.tps[tpId];
    const username = tp && (tp.username ? tp.username : tp.creator);
    const expanded = this.state.expand[tpId];
    const isUpvoted = tp.users && (this.props.isLoggedIn in tp.users) && (tp.users[this.props.isLoggedIn]===1);
    const isDownvoted = tp.users && (this.props.isLoggedIn in tp.users) && (tp.users[this.props.isLoggedIn]===-1);

    return (
      <div className='individual-tp-preview' key={tpId}>
        <div className='main-tp-text'>
          <div className='tp-preview-username'>@{username}</div>
          <TpPreview initial={tp.initial} approach={tp.approach} solution={tp.solution} expanded={expanded} />
          <div className='align-right'>
          {((tp.initial && tp.initial.length > 44) 
            || (tp.approach && tp.approach.length > 44) 
            || (tp.solution && tp.solution.length > 44)) ? this.generateMessage(expanded, tpId) : ''}
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

  changeOrder = sortBy => {
    const { questId, questParam } = this.props;
    if (this.props.tps) {
      let list = {};
      Object.keys(this.props.tps).map(tpId => {
        list[tpId] = false;
        return;
      });
      this.setState({ expand: list })
    }
    this.props.history.push(`/q/${questId}/community/${sortBy}`);
  }

  changeShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  changeExpand = (tpId, value) => {
    this.setState({ expand: Object.assign(this.state.expand, {[tpId]: value}) })
  }

  handleTps = questParam => {
    this.props.history.push(`/q/${this.props.questId}/${questParam}`);
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
      total: 0
    }
    :
    {
      questId: questId,
      initial: this.state.initial,
      approach: this.state.approach,
      solution: this.state.solution,
      total: 0
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

    const { questParam, sortBy } = this.props;

    if ((questParam == 'community' && !sortBy) || (sortBy && sortBy != 'top' && sortBy != 'new')) {
      return <Redirect to={`/q/${this.props.questId}/community/top`}/>;
    }

    if (!sortBy && questParam != 'my' && questParam != 'community') {
      return <Redirect to={`/q/${this.props.questId}/my`}/>;
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

    const tps = this.props.tps &&
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
          disabled={sortBy == 'top'}
          onClick={() => this.changeOrder('top')}
        >
          Top TPs
        </button>
        <button
          disabled={sortBy == 'new'}
          onClick={() => this.changeOrder('new')}
        >
          New TPs
        </button>
        {sortBy == 'top' ? tps : tpsByTime}
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
    if (questParam == 'my') {
      section = myTp;
    }
    else {
      section = communityTps;
    }

    if (!this.props.isLoggedIn) {
      section = (
        <div className='login-message'>
          <p>You need to log in or register to write your own TP.</p>
        </div>
      );
    }
    else if (!this.props.onboarded) {
      section = (
        <div className='login-message'>
          <p>
            You need to set your username on the
            &nbsp;
            <Link to={`/profile`}>
              Profile
            </Link>
            &nbsp;
            page before writing your own TP.
          </p>
        </div>
      );
    }
    else if (!this.props.emailVerified) {
      section = (
        <div className='login-message'>
          <p>
            You need to verify your email on the
            &nbsp;
            <Link to={`/profile`}>
              Profile
            </Link>
            &nbsp;
            page before writing your own TP.
          </p>
        </div>
      );
    }

    return(
      <div>
        <link
        href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
        rel="stylesheet"
        />
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
            disabled={questParam == 'my'}
            onClick={() => this.handleTps('my')}
          >
              My TP
          </button>
          <button
            className='community-tp-button-1'
            disabled={questParam == 'community'}
            onClick={() => this.handleTps('community/top')}
          >
              Community TPs
          </button>
          <hr className={questParam == 'my' ? 'divider-line' : 'divider-line-2'}/>
        </div>
        <div className={questParam == 'my' ? 'px-break' : 'px-break-2'}>
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
  const profile = state.firebase.profile;
  const username = profile && profile.username;
  const onboarded = profile && profile.onboarded;
  const user = props.firebase.auth().currentUser;
  const emailVerified = user && user.emailVerified;
  const questParam = props.match.params.questParam;
  const sortBy = props.match.params.sortBy;

  return { questId, title, description, definitive, topics, difficulty, answer, tps, username, isLoggedIn: state.firebase.auth.uid, tags, onboarded, emailVerified, questParam, sortBy};

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

