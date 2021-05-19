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

import { tags, companies } from 'constants/Lists';
import Loading from 'components/Loading.js';
import PageNotFound from 'pages/PageNotFound';

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
    marginLeft: '20px',
    marginRight: 'auto',
    marginTop: '23px',
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
    fontSize: '12px',
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
  '.tag-selected': {
    border: '3px #000000 solid'
  },
  '.no-quest': {
    backgroundColor: 'mediumGrey',
    width: '400px',
    padding: '25px',
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

  displayQuestion = (questId) => {
    const quest = this.props.questions[questId];
    const answered = this.props.questionHistory
      && this.props.questionHistory[questId];
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
          <div>
            {quest.company}
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
      && Object.keys(hotQuestions).map(questId => this.displayQuestion(questId));

    const quests = Object.keys(questions)
      // filter by difficulty
      .filter(questId => !isDiff || questions[questId].difficulty === diff)
      // filter by tag
      .filter(questId => !tag || (questions[questId].tags && questions[questId].tags[tag]))
      .filter(questId => !company || questions[questId].company === company)
      .map(questId => this.displayQuestion(questId));

    const noHot = (
      <div className="no-quest">
        No hot questions right now. Please come back soon!
      </div>
    );

    const noQuests = (
      // message if no questions match the diff/tag filters
      <div className="no-quest">
        There are no questions that match your search. Please try changing
        the difficulty or tag to find questions.
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
        <div className="sortby-container">
          <h2 className="white">Difficulty</h2>
          {/* buttons to sort by difficulty of question */}
          <div
            className={
              (this.props.diff === 'easy' && " tag-selected") +
              " diff-button pointer easy"
            }
            onClick={() => this.handleDiffFilter('easy')}
          >
            EASY
          </div>
          <div
            className={
              (this.props.diff === 'medium' && " tag-selected") +
              " diff-button pointer medium"
            }
            onClick={() => this.handleDiffFilter('medium')}
          >
            MEDIUM
          </div>
          <div
            className={
              (this.props.diff === 'hard' && " tag-selected") +
              " diff-button pointer hard"
            }
            onClick={() => this.handleDiffFilter('hard')}
          >
            HARD
          </div>
          <h2 className="white">Tags</h2>
          <div className="tag-button-container">
            {/* tag buttons to sort by tag */}
            {tagButtons}
          </div>
          <h2 className="white">Companies</h2>
          <div className="tag-button-container">
            {companyButtons}
          </div>
        </div>
        <div className="questions-container">
          <div className="flex">
            <h1 className="white">Questions</h1>
            {tag &&
              // click to view all questions (vanilla /questions URL)
              <div
                className="original-list pointer white"
                onClick={() => this.props.history.push('/questions')}
              >
                  View full list
              </div>}
          </div>
          <div>HOT</div>
          <div className="quest-container">
            {hotQuestions ? hot : noHot}
          </div>
          <div>----</div>
          <div className="quest-container">
            {/* actually show questions */}
            {quests.length ? quests : noQuests}
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
