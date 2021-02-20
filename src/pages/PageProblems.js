import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tags } from 'constants/Tags';
import Loading from 'components/Loading.js';

import '../styles/PageLanding.css';

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
          <span className="topic" key={tag}>{tag}</span>
        );

        return (
          <div className="question" key={questId}>
            <Link className="question-title" to={`/q/${questId}/my`}>
              #{questId}: {quest.title} {answered ? "✔" : ""}
            </Link>
            <br />
            <div className="topics">{topics}</div>
            <div>{quest.difficulty}</div>
          </div>
        );
      });

    const tagButtons = tags.map(tag => {
      return (
        <button onClick={() => this.handleTagFilter(tag)} key={tag}>
          Filter by {tag}
        </button>
      );
    });

    return (
      <div className="background">
        <div className="infobox">
          <div className="intro">Welcome to Hireglyph!</div>
          <div className="info">
            Hireglyph is the future of collaborative interview preparation.
            Using Hireglyph, you can view other users’ thought processes (TPs)
            so that you can understand the correct logic behind solving
            complicated interview problems. Additionally, you can receive
            feedback on your own TPs from college students and financial
            professionals alike.
          </div>
          <div className="info-email">
            Questions, comments, or concerns? Email us at{" "}
            <a className="email-link" href="mailto: admin@hireglyph.com">
              admin@hireglyph.com
            </a>.
          </div>
          <br />
        </div>
        <br />
        <br />
        <div className="questions">
          <h1 className="header">Quantitative Analysis Questions</h1>
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
          <div>{tagButtons}</div>
          <div>{quests}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_state, props) => {
  return { tag: props.match.params.tag };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(PageProblems);
