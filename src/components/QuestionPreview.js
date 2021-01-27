import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class QuestionPreview extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    if (!isLoaded(this.props.question)) {
      return (
        <div>
        <div>{this.props.questId}</div>
      </div>
      );
    }
    return (
      <div>
        <div>{this.props.questId}</div>
        <div>{this.props.question.title}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const questions = state.firebase.data.questions;
  return {question: questions && state.firebase.data.questions[props.questId]}
}

export default compose(
  withRouter,
  firebaseConnect(props => [
    {
      path: '/questions/' + props.questId,
    },
  ]),
  connect(mapStateToProps)
)(QuestionPreview);
