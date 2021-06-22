/** @jsx jsx */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { tags, companies } from 'constants/Lists';
import Loading from 'components/Loading.js';
import PageNotFound from 'pages/PageNotFound';

import { PageProblemsSx } from 'theme/PageProblemsStyle';

class PageProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titles: '', loaded: false };
  }

  handleTagFilter = (tag) => {
    const diffBase = this.props.diff ? `diff=${this.props.diff}` : '';
    const companyBase = this.props.company ? `company=${this.props.company}` : '';
    const base = diffBase + '&' + companyBase;
    this.props.history.push(
      this.props.tag === tag ?
        '/questions/?' + base :
        `/questions/?tag=${tag}&` + base
    );
  };

  handleDiffFilter = (diff) => {
    const tagBase = this.props.tag ? `tag=${this.props.tag}` : '';
    const companyBase = this.props.company ? `company=${this.props.company}` : '';
    const base = tagBase + '&' + companyBase;
    this.props.history.push(
      this.props.diff === diff ?
        '/questions/?' + base :
        `/questions/?diff=${diff}&` + base
    );
  };

  handleCompanyFilter = (company) => {
    const tagBase = this.props.tag ? `tag=${this.props.tag}` : '';
    const diffBase = this.props.diff ? `diff=${this.props.diff}` : '';
    const base = tagBase + '&' + diffBase;
    this.props.history.push(
      this.props.company === company ?
        '/questions/?' + base :
        `/questions/?company=${company}&` + base
    );
  };

  displayQuestion = (questId, hot) => {
    const quest = this.props.questions[questId];
    const answered = this.props.questionHistory
      && this.props.questionHistory[questId];
    const topics = quest.tags && Object.keys(quest.tags).map(tag =>
      <div className="tag" key={tag}>{tag}</div>
    );

    return (
      <Link className={"link " + (hot && " hot-quest-box")} to={`/q/${questId}/my`} key={questId}>
        <div className="flex">
          <div className="question-title">
            #{questId}: {quest.title}
            {answered && <FontAwesomeIcon icon={faCheck} className="check" />}
          </div>
          <div className={(hot && "hot-quest-diff  ") + quest.difficulty}>
            {!hot && quest.difficulty.toUpperCase()}
          </div>
          <div>
            {!hot && quest.company}
          </div>
        </div>
        <div className="tag-container">
          {topics}
        </div>
      </Link>
    );
  };

  render() {
    const {
      tag,
      diff,
      company,
      questions,
      questionHistory,
      hotQuestions
    } = this.props;

    if (!isLoaded(questions) || !isLoaded(questionHistory) || !isLoaded(hotQuestions)) {
      return <Loading />;
    }

    const isDiff = diff === 'easy' || diff === 'medium' || diff === 'hard';

    if ((diff && !isDiff)
      || (tag && !tags.includes(tag))
      || (company && !companies.includes(company))) {
      return <PageNotFound />;
    }

    const hot = hotQuestions
      && Object.keys(hotQuestions).map(questId => this.displayQuestion(questId, true));

    // filter by difficulty, tag, & company
    const quests = Object.keys(questions)
      .filter(questId => !isDiff || questions[questId].difficulty === diff)
      .filter(questId => !tag || (questions[questId].tags && questions[questId].tags[tag]))
      .filter(questId => !company || questions[questId].company === company)
      .map(questId => this.displayQuestion(questId, false));

    const noHot = (
      <div className="no-quest">
        No hot questions right now. Please come back soon!
      </div>
    );

    // message if no questions match the diff/tag/company filters
    const noQuests = (
      <div className="no-quest">
        There are no questions that match your search. Please try changing
        the difficulty, tag, or company to find questions.
      </div>
    );

    const tagButtons = tags.map(tag =>
      <div
        className={
          (this.props.tag === tag && " tag-selected") +
          " tag tag-button pointer"
        }
        onClick={() => this.handleTagFilter(tag)}
        key={tag}
      >
        {tag}
      </div>
    );

    const companyButtons = companies.map(company =>
      <div
        className={
          (this.props.company === company && " tag-selected") +
          " tag tag-button pointer"
        }
        onClick={() => this.handleCompanyFilter(company)}
        key={company}
      >
        {company}
      </div>
    );
    return (
      <div className="PageProblems" sx={PageProblemsSx}>
        {tag
          ? <ReactTitle
              title={`${tag[0].toUpperCase() + tag.slice(1)}
              Questions | Hireglyph`}
            />
          : <ReactTitle
              title={`Questions | Hireglyph`}
            />
        }
        <div className="page-problems">
          <div className="questions-container">
            <h3><FontAwesomeIcon icon={faFireAlt}  style={{color: '#DA1C1C'}}/> Hot</h3>
            <div className="hot-quest-container">
              {hotQuestions ? hot : noHot}
            </div>
            <div className="problems-container">
              <h3><FontAwesomeIcon icon={faLightbulb}  style={{color: '#EBB700'}}/> Questions</h3>
              {tag &&
                // click to view all questions (vanilla /questions URL)
                <div
                  className="original-list pointer"
                  onClick={() => this.props.history.push('/questions')}
                >
                    View full list
                </div>}
              <div className="quest-container">
                {/* actually show questions */}
                {quests.length ? quests : noQuests}
              </div>
            </div>
          </div>
          <div className="sortby-container">
            <h2>Difficulty</h2>
            {/* sort by difficulty */}
            <div
              className={
                (this.props.diff === 'easy' && " tag-selected") +
                " diff-button easy"
              }
              onClick={() => this.handleDiffFilter('easy')}
            >
              EASY
            </div>
            <div
              className={
                (this.props.diff === 'medium' && " tag-selected") +
                " diff-button medium"
              }
              onClick={() => this.handleDiffFilter('medium')}
            >
              MEDIUM
            </div>
            <div
              className={
                (this.props.diff === 'hard' && " tag-selected") +
                " diff-button hard"
              }
              onClick={() => this.handleDiffFilter('hard')}
            >
              HARD
            </div>
            {/* sort by tag */}
            <h2>Tags</h2>
            <div className="tag-button-container">
              {tagButtons}
            </div>
            <h2>Companies</h2>
            <div className="tag-button-container">
              {companyButtons}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { hotQuestions: state.firebase.data.hotQuestions };
};

export default compose(
  withRouter,
  firebaseConnect({ path: `/hotQuestions` }),
  connect(mapStateToProps)
)(PageProblems);
