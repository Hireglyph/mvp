/** @jsx jsx */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';
import { ReactTitle } from 'react-meta-tags';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFireAlt, faLightbulb, faPlus, faMinus, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { tags, companies } from 'constants/Lists';
import Loading from 'components/Loading.js';
import PageNotFound from 'pages/PageNotFound';

import { PageProblemsSx } from 'theme/PageProblemsStyle';

class PageProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      titles: '', 
      loaded: false,
      diffExpanded: false,
      topicsExpanded: false,
      companiesExpanded: false,
      questsExpanded: new Set(),
      hotQuestsExpanded: new Set(),
    };
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

  expandFilter = (filter, expand) => {
    this.setState({ [filter]: expand });
  };

  expandQuest = (quests, expanded, questId) => {
    let newSet = new Set(this.state[quests]);
    expanded ? newSet.delete(questId) : newSet.add(questId);
    this.setState({ [quests]: newSet });
  };

  displayHotQuestion = (questId) => {
    const quest = this.props.questions[questId];
    const answered = this.props.questionHistory
      && this.props.questionHistory[questId];
    
    const maxHotTags = 2;
    const keyArr = quest.tags && Object.keys(quest.tags);

    // topics that are displayed in the problem box
    const topics = quest.tags && keyArr.map((tag, i) =>
      <div key={tag}>
        {(i < 1 || keyArr.length <= maxHotTags) && <div className="tag topic-tag">{tag}</div>}
      </div>
    );
    // topics that are displayed in dropdown
    const dropdownTopics = quest.tags && keyArr.map((tag, i) =>
      <div key={tag}>
        {(i !== 0) && <div className="tag topic-tag dropdown-tag">{tag}</div>}
      </div>
    );

    const expanded = this.state.hotQuestsExpanded.has(questId);

    return (
      <div className="hot-quest-box" key={questId}>
        <Link className="hot-quest-box-link" to={`/q/${questId}/my`}>
          <div className="question-title">
            #{questId}: {quest.title}
          </div>
          <div className="hot-quest-tags">
            <div className="topic-container" 
              onMouseEnter={() => this.expandQuest('hotQuestsExpanded', false, questId)}  
              onMouseLeave={() => this.expandQuest('hotQuestsExpanded', true, questId)}
            >
              {topics}
              {(keyArr && keyArr.length > maxHotTags && !expanded) && <FontAwesomeIcon icon={faAngleRight} className="drop-arrow"/>}
              {(keyArr && keyArr.length > maxHotTags && expanded) && <FontAwesomeIcon icon={faAngleDown} className="drop-arrow"/>}
            </div>
            <div className="hot-quest-icon-box">
              {answered && <FontAwesomeIcon icon={faCheck} className="check" />}
              <div className={"hot-quest-diff  " + quest.difficulty}></div>
            </div>
          </div>
        </Link>
        {(keyArr && keyArr.length > maxHotTags && expanded) 
          && <div className="dropdown hot-quests-dropdown" >{dropdownTopics}</div>}
      </div>
    );
  };

  displayQuestion = (questId, maxTags) => {
    const quest = this.props.questions[questId];
    const answered = this.props.questionHistory
      && this.props.questionHistory[questId];

    const keyArr = quest.tags && Object.keys(quest.tags);

    // topics that are displayed in the problem box
    const topics = quest.tags && keyArr.map((tag, i) =>
      <div key={tag}>
        {(i < maxTags) && <div className="tag topic-tag">{tag}</div>}
      </div>
    );
    // topics that are displayed in dropdown
    const dropdownTopics = quest.tags && keyArr.map((tag, i) =>
    <div key={tag}>
      {(i >= maxTags) && <div className="tag topic-tag dropdown-tag">{tag}</div>}
    </div>
    );

    const expanded = this.state.questsExpanded.has(questId);

    return (
      <div key={questId}>
        <Link className="problem-box" to={`/q/${questId}/my`}>
          <div className="question-title problem-title">
            <div className="check-container">
              {answered && <FontAwesomeIcon icon={faCheck} className="check" />}
            </div>
            #{questId}: {quest.title}
          </div>
          <div className="topic-container problems-topic-container" 
            onMouseEnter={() => this.expandQuest('questsExpanded', false, questId)}  
            onMouseLeave={() => this.expandQuest('questsExpanded', true, questId)}
          >
            {topics}
            {(keyArr && keyArr.length > maxTags && !expanded) 
              && <FontAwesomeIcon icon={faAngleRight} className="drop-arrow" />}
            {(keyArr && keyArr.length > maxTags && expanded) 
              && <FontAwesomeIcon icon={faAngleDown} className="drop-arrow" />}
          </div>
          {(keyArr && keyArr.length > maxTags && expanded) 
            && <div className="dropdown problems-dropdown">{dropdownTopics}</div>}
          {quest.company ?
            <div className="tag company-tag">
              {quest.company}
            </div> :
            <div className="tag no-company-tag"></div>
          }
          <div className={quest.difficulty + " tag problems-diff"}>
            {quest.difficulty}
          </div>
        </Link>
      </div>
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

    let maxTags = 4;
    if (window.innerWidth < 1800) {
      maxTags = 3;
    } 
    if (window.innerWidth < 1550) {
      maxTags = 2;
    } 
    if (window.innerWidth < 1100) {
      maxTags = 1;
    } 

    const hot = hotQuestions
      && Object.keys(hotQuestions).map(questId => this.displayHotQuestion(questId));

    // filter by difficulty, tag, & company
    const quests = Object.keys(questions)
      .filter(questId => !isDiff || questions[questId].difficulty === diff)
      .filter(questId => !tag || (questions[questId].tags && questions[questId].tags[tag]))
      .filter(questId => !company || questions[questId].company === company)
      .map(questId => this.displayQuestion(questId, maxTags));

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

    const topicButtons = tags.map(tag =>
      <div
        className={
          ((this.props.tag === tag) && " tag-selected") +
          " filter-tag-link pointer"
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
          " filter-tag-link pointer"
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
            <h3 className="section-title"><FontAwesomeIcon icon={faFireAlt}  style={{color: '#DA1C1C'}}/> Hot</h3>
            <div className="hot-quest-container">
              {hotQuestions ? hot : noHot}
            </div>
            <h3 className="section-title"><FontAwesomeIcon icon={faLightbulb}  style={{color: '#EBB700'}}/> Problems</h3>
            <div className="problems-container">
              {tag &&
                  // click to view all questions (vanilla /questions URL)
                  <div
                    className="original-list-btn"
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
            <h4 className="sortby-title">Filter by</h4>
            <div className="sortby-box">
              <div className="sortby-header pointer" onClick={() => this.expandFilter('diffExpanded', !this.state.diffExpanded)}>
                <h5 className="filter-tag-title">Difficulty</h5>
                {this.state.diffExpanded ?
                  <FontAwesomeIcon icon={faMinus} className="pointer" /> :
                  <FontAwesomeIcon icon={faPlus} className="pointer" />
                }
              </div>
              {/* sort by difficulty */}
              {(!this.state.diffExpanded && this.props.diff) &&
                <div
                  className="tag-selected filter-tag-link pointer"
                  onClick={() => this.handleDiffFilter(this.props.diff)}
                >
                  {this.props.diff}
                </div>
              }
              {this.state.diffExpanded &&  
                <div>
                  <div
                    className={
                      (this.props.diff === 'easy' && " tag-selected") +
                      " filter-tag-link pointer"
                    }
                    onClick={() => this.handleDiffFilter('easy')}
                  >
                    Easy
                  </div>
                  <div
                    className={
                      (this.props.diff === 'medium' && " tag-selected") +
                      " filter-tag-link pointer"
                    }
                    onClick={() => this.handleDiffFilter('medium')}
                  >
                    Medium
                  </div>
                  <div
                    className={
                      (this.props.diff === 'hard' && " tag-selected") +
                      " filter-tag-link pointer"
                    }
                    onClick={() => this.handleDiffFilter('hard')}
                  >
                    Hard
                  </div>
                </div>
              }
            </div>
            <div className="sortby-box">
              {/* sort by topic */}
              <div className="sortby-header pointer" onClick={() => this.expandFilter('topicsExpanded', !this.state.topicsExpanded)}>
                <h5 className="filter-tag-title">Topics</h5>
                {this.state.topicsExpanded ?
                  <FontAwesomeIcon icon={faMinus} className="pointer" /> :
                  <FontAwesomeIcon icon={faPlus} className="pointer" />
                }
              </div>
              {(!this.state.topicsExpanded && this.props.tag) &&
                <div
                  className="tag-selected filter-tag-link pointer"
                  onClick={() => this.handleTagFilter(this.props.tag)}
                >
                  {this.props.tag}
                </div>
              }
              {this.state.topicsExpanded &&
                <div>
                  {topicButtons}
                </div>
              }
            </div>
            <div className="sortby-box">
              <div className="sortby-header pointer" onClick={() => this.expandFilter('companiesExpanded', !this.state.companiesExpanded)}>
                <h5 className="filter-tag-title">Companies</h5>
                {this.state.companiesExpanded ?
                  <FontAwesomeIcon icon={faMinus} className="pointer" /> :
                  <FontAwesomeIcon icon={faPlus} className="pointer" />
                }
              </div>
              {(!this.state.companiesExpanded && this.props.company) &&
                <div
                  className="tag-selected filter-tag-link pointer"
                  onClick={() => this.handleCompanyFilter(this.props.company)}
                >
                  {this.props.company}
                </div>
              }
              {this.state.companiesExpanded &&
                <div>
                  {companyButtons}
                </div>
              }
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
