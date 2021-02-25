import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class QuestionPreview extends React.Component {
  render() {
    const { questId, question, solved } = this.props;

    if (!isLoaded(question)) {
      return null;
    }

    const topics = question.tags &&
      Object.keys(question.tags).map(tag => {
        return (
          <span className='topic' key={tag}>{tag} </span>
        );
      });

    return (
      <div>
        <Link to={`/q/${questId}`}>
          <div>
            Question #{questId}: {question.title} {solved ? "✔" : ""}
          </div>
        </Link>
        <div>{question.difficulty}</div>
        <div>{topics}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { questions, questionHistory } = state.firebase.data;
  const question = questions && questions[props.questId];
  const solved = questionHistory && questionHistory[props.questId];

  return { question, solved };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(QuestionPreview);
