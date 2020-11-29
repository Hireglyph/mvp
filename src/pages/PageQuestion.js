import React from 'react';
import TpPreview from '../components/TpPreview.js';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loading && isLoaded(this.props.tps)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);
      this.setState({ loading: false, keys, });
      if (this.props.tps) {
        this.setState({ time: Object.keys(this.props.tps).reverse() })
      }
    }
  }

  changeOrder = () => {
    this.setState({ orderByTop: !this.state.orderByTop });
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
    const tp = {
      initial: this.state.initial,
      approach: this.state.approach,
      solution: this.state.solution,
      creator: uid,
      username: this.props.username,
      total: 0
    };
    const tp2 = {
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

    if (this.props.difficulty && this.props.questId && this.props.difficulty === 'easy') {
      return <Redirect to={`/eq/${this.props.questId}`} />
    }

    const topics = this.props.tags &&
      Object.keys(this.props.tags).map(tag => {
        return (
          <span className='topic-2' key={tag}>{tag} </span>
        );
    });

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
        const tp = this.props.tps[tpId];
        return (
          <TpPreview tp={tp} tpId={tpId} questId={this.props.questId} key={tpId}/>
        );
    });

    const tpsByTime = this.props.tps &&
      this.state.time.map(tpId => {
        const tp = this.props.tps[tpId];
        return (
          <TpPreview tp={tp} tpId={tpId} questId={this.props.questId} key={tpId}/>
        );
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

  const tps = question && state.firebase.data.tps && state.firebase.data.tps[questId];
  const username = state.firebase.profile && state.firebase.profile.username;
  return { questId, title, description, definitive, topics, difficulty, tps, username, isLoggedIn: state.firebase.auth.uid, tags};

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

