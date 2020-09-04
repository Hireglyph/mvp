import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageQuestion extends React.Component {
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
      Object.keys(this.props.tps.correct).map(tpId => {
        const tp = this.props.tps.correct[tpId];

        return (
          <div key={tpId}>
            <div>Initial thoughts: {tp.initial}</div>
            <div>Approaches tried: {tp.approach}</div>
            <div>Final solution: {tp.solution}</div>
            <br />
          </div>
        );
    });

    return(
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <div>Difficulty: {this.props.difficulty}</div>
        <div>Topics: {topics}</div>
        <hr></hr>
        <div>{correctTps}</div>
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
  const tps = question && question.tps

  return { questId, title, description, definitive, topics, difficulty, tps };
}

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??
export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}`, storeAs: `${questId}/tps`}];
  }),
  connect(mapStateToProps)
)(PageQuestion);
