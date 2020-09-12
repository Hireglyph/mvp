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
          <h3>Account</h3>
          { this.props.uid ? (
            <div>
              <div>{this.props.email}</div>
              <button onClick={() => this.props.firebase.logout()}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/register">Register</Link>
              <br />
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    questions: state.firebase.data.questions,
    email: state.firebase.auth.email,
    uid: state.firebase.auth.uid,
  };
}

export default compose(
  firebaseConnect(['/questions']),
  connect(mapStateToProps)
)(PageLanding);
