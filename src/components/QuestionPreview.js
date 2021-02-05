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
    if (!isLoaded(this.props.title)
    || !isLoaded(this.props.tags)
    || !isLoaded(this.props.difficulty) ) {
      return (
        <div>
          <div>{this.props.questId}</div>
        </div>
      );
    }

    const topics = this.props.tags &&
      Object.keys(this.props.tags).map(tag => {
        return (
          <span className='topic' key={tag}>{tag} </span>
        );
      });

    return (
      <div>
        <Link to={`/q/${this.props.questId}`}>
          <div>
            Question #{this.props.questId}: {this.props.title} {this.props.solved ? "✔" : ""}
          </div>
        </Link>
        <div>{this.props.difficulty}</div>
        <div>{topics}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const questions = state.firebase.data.questions;
  const question = questions && questions[props.questId];
  const { title, tags, difficulty } = question || {};
  const solved =
    state.firebase.data.questionHistory &&
    state.firebase.data.questionHistory[props.uid] &&
    state.firebase.data.questionHistory[props.uid][props.questId];
  return { title, tags, difficulty, solved };
}

export default compose(
  withRouter,
  firebaseConnect(props => [
    { path: '/questions/' + props.questId },
    { path: `/questionHistory/` + props.uid + `/${props.questId}` },
  ]),
  connect(mapStateToProps)
)(QuestionPreview);
