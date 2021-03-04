/** @jsx jsx */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { tags } from 'constants/Tags';
import Loading from 'components/Loading.js';
import { jsx } from 'theme-ui';

const PageProblemsSx = {
  display: 'flex',
  fontFamily: 'Open-Sans',

  '.header': {
    color: 'white',
  },
  '.tags-container': {
    margin: '100px',
    textAlign: 'center',
  },
  '.questions-container': {
    marginTop: '30px',
  },
  '.quest-container': {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '.question-box': {
    backgroundColor: 'lightGrey',
    width: '315px',
    height: '139px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginRight: '20px',
    marginTop: '20px',
    padding: '20px',
  },
  '.tag': {
    backgroundColor: 'orange',
    borderRadius: '4px',
    width: '107.61px',
    height: '22px',
    textAlign: 'center',
    margin: '10px',
  },
  '.question-title': {
    color: 'black',
    fontSize: '20px',
    textDecoration: 'none',
    marginRight: '20px',
  },
  '.easy': {
    color: '#27B12A',
  },
  '.medium': {
    color: '#DE710C',
  },
  '.hard': {
    color: '#DA1C1C',
  },
  '.difficulty': {
    fontSize: '20px',
    marginLeft: '20px',
  },
  '.check': {
    transform: 'rotate(45deg)',
    height: '24px',
    width: '12px',
    borderBottom: '3px solid #27B12A',
    borderRight: '3px solid #27B12A',
  },
};

class PageProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titles: '', loaded: false };
  }

  handleTagFilter = (tag) => {
    this.props.history.push(`/questions/${tag}`);
  };

  render() {
    const { tag, questions, questionHistory } = this.props;

    if (!isLoaded(questions) || !isLoaded(questionHistory)) {
      return <Loading />;
    }

    const isDiff = tag === 'easy' || tag === 'medium' || tag === 'hard';

    const quests = Object.keys(questions)
      .filter(questId => !isDiff || questions[questId].difficulty === tag)
      .filter(questId => isDiff || !tag || questions[questId].tags[tag])
      .map(questId => {
        const quest = questions[questId];
        const answered = questionHistory && questionHistory[questId];

        const topics = quest.tags && Object.keys(quest.tags).map(tag =>
          <div className="tag" key={tag}>{tag}</div>
        );

        return (
          <div className="question-box" key={questId}>
            <div style={{ display: 'flex' }}>
              <Link className="question-title" to={`/q/${questId}/my`}>
                #{questId}: {quest.title}
              </Link>
              {answered && <div className="check"></div>}
              <div className={quest.difficulty + ' difficulty'}>
                {quest.difficulty.toUpperCase()}
              </div>
            </div>
            <div>s
              {topics}
            </div>
          </div>
        );
      });

    const tagButtons = tags.map(tag => {
      return (
        <div
          className="tag"
          onClick={() => this.handleTagFilter(tag)}
          key={tag}
          style={{ cursor: 'pointer' }}
        >
          {tag}
        </div>
      );
    });

    return (
      <div className="PageProblems" sx={PageProblemsSx}>
        <i className="fas fa-exclamation-triangle"></i>
        <div className="tags-container">
          <h2 className="header">Tags</h2>
          {tagButtons}
        </div>
        <div className="questions-container">
          <h1 className="header">Questions</h1>
          <button onClick={() => this.handleTagFilter('')}>
            Original list
          </button>
          <button onClick={() => this.handleTagFilter('easy')}>
            Filter by easy
          </button>
          <button onClick={() => this.handleTagFilter('medium')}>
            Filter by medium
          </button>
          <button onClick={() => this.handleTagFilter('hard')}>
            Filter by hard
          </button>
          <br />
          <div className="quest-container">
            {quests}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
)(PageProblems);
