/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { HotQuestSx } from 'theme/ComponentStyle.js';

class QuestionPreview extends React.Component {
  render() {
    const { questId, question, solved } = this.props;

    if (!isLoaded(question)) {
      return null;
    }

    const topics = question.tags &&
      Object.keys(question.tags).map(tag => {
        return (
          <div className="preview-tag" key={tag}>{tag}</div>
        );
      });

    // display question: title, difficulty, tags
    // + checkmark if user has solved the question
    return (
      <div sx={HotQuestSx}>
        <Link
          className="preview-link"
          to={`/q/${questId}`}
        >
          <div className="question-preview">
            <div className="preview-top">
              <div>
                #{questId}: {question.title}
                {solved &&
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="check-mark"
                  />}
              </div>
              <div
                className={question.difficulty + ' preview-difficulty'}
              >
                {question.difficulty.toUpperCase()}
              </div>
            </div>
            <div className="preview-tags-block">
              {topics}
            </div>
          </div>
        </Link>
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
  connect(mapStateToProps)
)(QuestionPreview);
