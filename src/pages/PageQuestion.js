import React from 'react';
import TpPreview from '../components/TpPreview.js';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageQuestion.css'

class PageQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      setting: 1,
      initial: '',
      approach: '',
      solution: '',
      loading: true,
      keys: [],
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loading && isLoaded(this.props.tps)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);

      this.setState({ loading: false, keys });
    }
  }

  handleTps = number => {
    this.setState({ setting: number });
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  createTp = () => {
    const tpId = this.props.firebase.push(`/tps/${this.props.questId}`).key;
    const updates = {};
    const tp = {
      initial: this.state.initial,
      approach: this.state.approach,
      solution: this.state.solution,
      creator: this.props.isLoggedIn,
      total: 0
    };

    updates[`/tps/${this.props.questId}/${tpId}`] = tp;
    updates[`/users/${this.props.isLoggedIn}/tpHistory/${tpId}`] = {questId: this.props.questId};
    const onComplete = () => {
      this.props.history.push(`/tp/${this.props.questId}/${tpId}`);
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

    const topics = this.props.topics &&
      Object.keys(this.props.topics).map(topicId => {
        return (
          <span key={topicId}>{this.props.topics[topicId]} </span>
        );
    });

    let bars;
    if (this.props.difficulty && this.props.difficulty === 'easy') {
      bars = (
        <div>
          <div className='level1'></div>
          <div className='level2n'></div>
          <div className='level3n'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'medium') {
      bars = (
        <div>
          <div className='level1'></div>
          <div className='level2y'></div>
          <div className='level3n'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'hard') {
      bars = (
        <div>
          <div className='level1'></div>
          <div className='level2y'></div>
          <div className='level3y'></div>
        </div>
      );
    }

    const Tps = this.props.tps &&
      this.state.keys.map(tpId => {
        const tp = this.props.tps[tpId];
        return (
            <TpPreview tp={tp} tpId={tpId} questId={this.props.questId} key={tpId}/>
          );
        return;

    });

    const myTp = (
      <div>
        <input
        name = "initial"
        placeholder="initial"
        onChange = {this.handleChange}
        value={this.state.initial}
        />
        <br/>

        <input
        name = "approach"
        placeholder="approach"
        onChange = {this.handleChange}
        value={this.state.approach}
        />
        <br/>

        <input
        name = "solution"
        placeholder="solution"
        onChange = {this.handleChange}
        value={this.state.solution}
        />
        <br />
        <br />
        <button
        disabled=
        {this.state.initial.trim()===''||this.state.approach.trim()===''||this.state.solution.trim()===''}
        onClick={this.createTp}
        >
        Submit
        </button>
      </div>

      );

    let section;
    if (this.state.setting === 1) {
      section = myTp;
    }
    if (this.state.setting === 2) {
      section = Tps;
    }

    if (!this.props.isLoggedIn) {
      section = (
        <div>
          <p>You need to log in or register to view TPs or write your own.</p>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </div>
        )
    }

    return(
      <div>
        <div className='question-block'>
          <div className='question-title'>
              <h1>{this.props.title}</h1>
          </div>
          <div className='question-description'>
            <p>{this.props.description}</p>
          </div>
          <div>{bars}</div>
          <div>Topics: {topics}</div>
        </div>
        <br />
        <div>
          <button
            disabled={this.state.setting === 1}
            onClick={() => this.handleTps(1)}
          >
              MY TP
          </button>
          <button
            disabled={this.state.setting === 2}
            onClick={() => this.handleTps(2)}
          >
              Community TPs
          </button>
        </div>
        <hr />
        <div>
          {section}
          <hr />
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}


const populates =
  [{child: 'creator', root: 'users'}];

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId
  const question = state.firebase.data[questId];

  const title = question && question.title;
  const description = question && question.description;
  const definitive = question && question.definitive;
  const topics = question && question.topics;
  const difficulty = question && question.difficulty;
  //const tps = question && question.tps;
  const tps = question && populate(state.firebase, `/tps/${questId}`, populates)
  return { questId, title, description, definitive, topics, difficulty, tps, isLoggedIn: state.firebase.auth.uid};

}

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??
export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [{path: `/questions/${questId}`, storeAs: questId},
            //{path: `/tps/${questId}`, storeAs: `${questId}/tps`},
            {path: `/tps/${questId}`, populates } ];
  }),
  connect(mapStateToProps)
)(PageQuestion);

