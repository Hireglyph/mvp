import React from 'react';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageLanding extends React.Component {
    render() {
        if (!isLoaded(this.props.questions)) {
          return (<div>Loading...</div>);
        }

        const quests =
          Object.keys(this.props.questions).map(questId => {
            const quest = this.props.questions[questId];

            const topics = quest.topics &&
              Object.keys(quest.topics).map(topicId => {
                return (
                  <span>{quest.topics[topicId]} </span>
                );
            });

            return (
              <div key={questId}>
                <Link to={`/q/${questId}`}>{quest.title}</Link>
                <span>&nbsp;&nbsp;Difficulty: {quest.difficulty}</span>
                <span>&nbsp;&nbsp;Topics: {topics}</span>
                <br />
              </div>
            );
          });

        return (
          <div>
            <h1>Questions</h1>
            <div>{quests}</div>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    questions: state.firebase.data.questions,
  };
}

export default compose(
  firebaseConnect(['/questions']),
  connect(mapStateToProps)
)(PageLanding);
