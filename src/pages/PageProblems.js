/** @jsx jsx */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { tags } from 'constants/Tags';
import Loading from 'components/Loading.js';
import { jsx } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const PageProblemsSx = {
  display: 'flex',
  fontFamily: 'Open-Sans',

  '.link': {
    textDecoration: 'none',
    color: 'black',
  },
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
    width: '320px',
    height: '139px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '20px',
  },
  '.tag-container': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '70px',
  },
  '.tag': {
    fontSize: '1vw',
    backgroundColor: 'orange',
    borderRadius: '4px',
    width: '107.61px',
    height: '22px',
    textAlign: 'center',
    margin: '5px',
    paddingTop: '2px',
  },
  '.question-title': {
    fontSize: '18px',
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
    fontSize: '16px',
    marginLeft: 'auto',
  },
  '.check': {
    color: '#27B12A',
    marginLeft: '5px',
    marginTop: '3px',
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
      .filter(questId => isDiff || !tag || questions[questId].tags && questions[questId].tags[tag])
      .map(questId => {
        const quest = questions[questId];
        const answered = questionHistory && questionHistory[questId];

        const topics = quest.tags && Object.keys(quest.tags).map(tag =>
          <div className="tag" key={tag}>{tag}</div>
        );

        return (
          <Link className="question-box link" to={`/q/${questId}/my`} key={questId}>
            <div style={{ display: 'flex' }}>
              <div className="question-title">
                #{questId}: {quest.title}
              </div>
              {answered && <FontAwesomeIcon icon={faCheck} className="check" />}
              <div className={quest.difficulty + ' difficulty'}>
                {quest.difficulty.toUpperCase()}
              </div>
            </div>
            <div className="tag-container">
              {topics}
            </div>
          </Link>
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
