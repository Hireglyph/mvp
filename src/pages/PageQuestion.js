import React from 'react';
import TpPreview from '../components/TpPreview.js';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {setting: 3, 
      
      initial: '',
      approach: '',
      solution: '',
      type: 'help',
    };
  }

  handleTps = number => {
    this.setState({setting: number});
    if( (number != 3) && (!this.props.viewed) ) {
      const updates = {};
      const tp = {
        viewed: true,
      };
      updates[`/users/${this.props.isLoggedIn}/viewedTps/${this.props.questId}`] = tp;
      this.props.firebase.update('/', updates);
    }
  }

  handleChange = event => { this.setState( { [event.target.name]: event.target.value } ) } ;

  handleCheckboxChange = event => { 
    this.setState( { [event.target.name]: (event.target.value ? 'correct' : 'help') } )};

  createTp = () => {
    const tpId = this.props.firebase.push(`/tps/${this.props.questId}`).key;
    const updates = {};
    const tp = {
      initial: this.state.initial, 
      approach: this.state.approach, 
      solution: this.state.solution,
      type: this.state.type,
      creator: this.props.isLoggedIn
      };

    updates[`/tps/${this.props.questId}/${tpId}`] = tp;
    updates[`/users/${this.props.isLoggedIn}/tpHistory/${this.props.questId}`] = {tpId: tpId};
    const onComplete = () => {
      this.props.history.push(`/tp/${this.props.questId}/${tpId}`);
    }
    this.props.firebase.update('/', updates, onComplete);
  }

  render() {

    if (!isLoaded(this.props.title) || !isLoaded(this.props.tps)) {
      return (<div>Loading...</div>);
    }

    const topics = this.props.topics &&
      Object.keys(this.props.topics).map(topicId => {
        return (
          <span key={topicId}>{this.props.topics[topicId]} </span>
        );
    });

    const correctTps = this.props.tps &&
      Object.keys(this.props.tps).map(tpId => {
        const tp = this.props.tps[tpId];

        if (tp.type === "correct"){
          return (
            <TpPreview tp={tp} tpId={tpId} questId={this.props.questId}/>
          );
        }
        return;

    });

    const helpTps = this.props.tps &&
      Object.keys(this.props.tps).map(tpId => {
        const tp = this.props.tps[tpId];

        if (tp.type === "help") {
          return (
            <TpPreview tp={tp} tpId={tpId} questId={this.props.questId}/>
          );
        }
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
        <p>Is your TP correct?</p>
        <input 
        name="type"
        type="checkbox"
        onChange={this.handleCheckboxChange} 
        value={this.state.type}
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
    const tpsViewed = (
      <div>
        <p>Because you have already viewed other TPs to this problem, you cannot submit your own TP to this problem.</p>
      </div>
    );

    const noTp = (
      <div>
        <p>Because you have already submitted a TP, you cannot submit a TP to this problem anymore.</p>
      </div>
    );

    let section;
    if(this.state.setting===1){
      section = correctTps;
    }
    if(this.state.setting===2){
      section = helpTps
    }
    if(!this.props.solved && !this.props.viewed && this.state.setting===3){
      section = myTp
    }
    if(!this.props.solved && this.props.viewed && this.state.setting===3){
      section = tpsViewed;
    }
    if(this.props.solved && this.state.setting===3){
      section = noTp;
    }
   
    if(!this.props.isLoggedIn){
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
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <div>Difficulty: {this.props.difficulty}</div>
        <div>Topics: {topics}</div>
        <br />
        <div>
          <button
            disabled={this.state.setting===3}
            onClick={() => this.handleTps(3)}
          >
              MY TP
          </button>
          <button
            disabled={this.state.setting===1}
            onClick={() => this.handleTps(1)}
          >
              CORRECT TPs
          </button>
          
          <button
            disabled={this.state.setting===2}
            onClick={() => this.handleTps(2)}
          >
              HELP
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

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId
  const question = state.firebase.data[questId];

  const title = question && question.title;
  const description = question && question.description;
  const definitive = question && question.definitive;
  const topics = question && question.topics;
  const difficulty = question && question.difficulty;
  const tps = question && question.tps;
  if(state.firebase.auth.uid){
    const user = state.firebase.data.users && state.firebase.data.users[state.firebase.auth.uid];
    const solved = user && questId && (questId in user.tpHistory);
    const viewed = user && questId && (questId in user.viewedTps);
    return { questId, title, description, definitive, topics, difficulty, tps, isLoggedIn: state.firebase.auth.uid, solved, viewed};
  }
  return { questId, title, description, definitive, topics, difficulty, tps, isLoggedIn: state.firebase.auth.uid};

}

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??
export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}`, storeAs: `${questId}/tps`},
            {path: '/users'} ];
  }),
  connect(mapStateToProps)
)(PageQuestion);

