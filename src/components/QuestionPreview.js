/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PreviewSx = {
  '.preview-link': {
    textDecoration: 'none',
  },

  '.question-preview': {
    fontFamily: 'Open-Sans',
    color: 'black',
    width: '100%',
    backgroundColor: 'lightGrey',
    minHeight: '60px',
    border: '1px solid #8E8E8E',
    '&:hover': {
      backgroundColor: 'mediumGrey',
    },
  },

  '.check-mark': {
    color: 'easyGreen',
    marginRight: '5px',
    marginLeft: '5px',
    marginTop: '3px',
  },

  '.preview-top': {
    display: 'flex',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },

  '.preview-difficulty': {
    marginRight: '10px',
    marginLeft: 'auto',
  },

  '.preview-tags-block': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
  },

  '.preview-tag': {
    fontSize: '12px',
    backgroundColor: 'orange',
    borderRadius: '4px',
    width: '100px',
    height: '20px',
    textAlign: 'center',
    margin: '5px',
    lineHeight: '20px',
    color: 'black',
  },
};

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

    return (
      /* display question: title, difficulty, tags
      also checkmark if user has solved the question */
      <div sx={PreviewSx}>
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
  // get question data, and user's question history from Redux store
  const { questions, questionHistory } = state.firebase.data;
  const question = questions && questions[props.questId];
  const solved = questionHistory && questionHistory[props.questId];

  return { question, solved };
}

export default compose(
  connect(mapStateToProps)
)(QuestionPreview);
