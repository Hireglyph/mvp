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
  '.white': {
    color: 'white',
  },
  '.pointer': {
    cursor: 'pointer',
  },
  '.flex': {
    display: 'flex',
  },
  '.original-list': {
    marginLeft: 'auto',
    marginRight: '85px',
    marginTop: '50px',
  },
  '.original-list:hover': {
    color: 'mediumGrey',
  },
  '.sortby-container': {
    marginTop: '130px',
    marginRight: '50px',
    marginLeft: '50px',
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
    height: '145px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '20px',
  },
  '.question-box:hover': {
    backgroundColor: 'mediumGrey',
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
  '.tag-button:hover': {
    backgroundColor: 'darkOrange',
  },
  '.diff-button': {
    display: 'inline-block',
    margin: '5px',
    backgroundColor: 'lightGrey',
    borderRadius: '4px',
    width: '80px',
  },
  '.diff-button:hover': {
    backgroundColor: 'mediumGrey',
  },
  '.tag-button-container': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '270px',
  },
  '.question-title': {
    fontSize: '18px',
  },
  '.easy': {
    color: 'easyGreen',
  },
  '.medium': {
    color: 'medOrange',
  },
  '.hard': {
    color: 'hardRed',
  },
  '.difficulty': {
    fontSize: '16px',
    marginLeft: 'auto',
  },
  '.check': {
    color: 'easyGreen',
    marginRight: '5px',
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
      .filter(questId => isDiff || !tag || (questions[questId].tags && questions[questId].tags[tag]))
      .map(questId => {
        const quest = questions[questId];
        const answered = questionHistory && questionHistory[questId];

        const topics = quest.tags && Object.keys(quest.tags).map(tag =>
          <div className="tag" key={tag}>{tag}</div>
        );

        return (
          <Link className="question-box link" to={`/q/${questId}/my`} key={questId}>
            <div className="flex">
              <div className="question-title">
                #{questId}: {quest.title}
                {answered && <FontAwesomeIcon icon={faCheck} className="check" />}
              </div>
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
          className="tag tag-button pointer"
          onClick={() => this.handleTagFilter(tag)}
          key={tag}
        >
          {tag}
        </div>
      );
    });

    return (
      <div className="PageProblems" sx={PageProblemsSx}>
        <div className="sortby-container">
          <h2 className="white">Difficulty</h2>
          <div
            className="diff-button pointer easy"
            onClick={() => this.handleTagFilter('easy')}
          >
            EASY
          </div>
          <div
            className="diff-button pointer medium"
            onClick={() => this.handleTagFilter('medium')}
          >
            MEDIUM
          </div>
          <div
            className="diff-button pointer hard"
            onClick={() => this.handleTagFilter('hard')}
          >
            HARD
          </div>
          <h2 className="white">Tags</h2>
          <div className="tag-button-container">
            {tagButtons}
          </div>
        </div>
        <div className="questions-container">
          <div className="flex">
            <h1 className="white">Questions</h1>
            {tag &&
              <div
                className="original-list pointer white"
                onClick={() => this.handleTagFilter('')}
              >
                  See full list
              </div>}
          </div>
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
