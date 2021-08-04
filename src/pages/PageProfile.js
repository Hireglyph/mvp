/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';
import { ReactTitle } from 'react-meta-tags';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faExpandAlt, faCompressAlt, faAlignLeft,
          faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell } from 'recharts';

import { tags } from 'constants/Lists';
import TpPreview from 'components/TpPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';
import { displayContent } from 'utils/display';
import { tpDelete, feedbackDelete, replyDelete } from 'utils/delete';
import { ProfileSx } from 'theme/PageProfileStyle'

class PageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackExpand: new Set(),
      tpExpand: new Set(),
      replyExpand: new Set(),
      calculated: false,
      tpCount: null,
      netUpvotes: null,
      difficultyStats: {},
      tagStats: {},
      showTpStats: true,
    };
  }

  componentDidUpdate() {
    if (!this.state.calculated &&
      isLoaded(this.props.tpHistory) &&
      isLoaded(this.props.feedbackHistory) &&
      isLoaded(this.props.questionHistory) &&
      isLoaded(this.props.questions))
    {
      const { questions, questionHistory, feedbackHistory, tpHistory } = this.props;

      let netUpvotes = 0;
      let difficultyStats = { easy: 0, medium: 0, hard: 0 };
      let tagStats = {};
      tags.forEach(tag => tagStats[tag] = 0);

      tpHistory &&
        Object.keys(tpHistory).forEach(tpId => netUpvotes += tpHistory[tpId].total);
      feedbackHistory &&
        Object.keys(feedbackHistory).forEach(feedbackId =>
        netUpvotes += feedbackHistory[feedbackId].score);
      questionHistory &&
        Object.keys(questionHistory).forEach(questId =>
          difficultyStats[questions[questId].difficulty] += 1);
      questionHistory &&
        Object.keys(questionHistory).forEach(questId =>
          Object.keys(questions[questId].tags).forEach(tag =>
            tags.indexOf(tag.toString()) >= 0 && (tagStats[tag] += 1))
      );

      this.setState({
        netUpvotes,
        difficultyStats,
        tagStats,
        tpCount: tpHistory ? Object.keys(tpHistory).length : 0,
        calculated: true
      });
    }
  }; 

  // generate expand or collapse message based on state expand set
  generateMessage = (isExpanded, id, type) => {
    if (!isExpanded) {
      return (
        <div
          onClick={() => this.changeExpand(true, id, type)}
          className="expand-collapse-btn profile-btn"
        >
          <FontAwesomeIcon icon={faExpandAlt} />
          {'\xa0'} Expand
        </div>
      );
    }
    return (
      <div
        onClick={() => this.changeExpand(false, id, type)}
        className="expand-collapse-btn profile-btn"
      >
        <FontAwesomeIcon icon={faCompressAlt} />
        {'\xa0'} Collapse
      </div>
    );
  };

  // add the tpId/feedbackId/replyId to the relevant expand set in state
  changeExpand = (value, id, type) => {
    let expandName, cloneSet;
    if (type === 'tp') {
      expandName = 'tpExpand';
      cloneSet = new Set(this.state.tpExpand);
    }
    else if (type ==='feedback') {
      expandName = 'feedbackExpand';
      cloneSet = new Set(this.state.feedbackExpand);
    }
    else if (type === 'reply') {
      expandName = 'replyExpand';
      cloneSet = new Set(this.state.replyExpand);
    }
    value ? cloneSet.add(id) : cloneSet.delete(id);
    this.setState({ [expandName]: cloneSet });
  };

  // go to different URL parameters in profile page (tp/feedback/reply)
  handleTps = (historyParam) => {
    this.props.history.push(`/profile/${historyParam}`);
  };

  onStatsDropdownClick = () => {
    this.setState({ showTpStats: !this.state.showTpStats });
  };

  render() {
    const {
      feedbackHistory,
      historyParam,
      tpHistory,
      replyHistory,
      username,
      questions,
    } = this.props;

    if (!isLoaded(tpHistory) || !isLoaded(feedbackHistory) 
        || !isLoaded(replyHistory) || !isLoaded(questions)) {
      return <Loading />;
    }

    if (historyParam !== 'tp' && historyParam !== 'feedback' && historyParam !== 'reply') {
      return <Redirect to={`/profile/tp`} />;
    }

    // for tp pie chart
    const chartData = [
      { name: 'Unsolved', value: questions.length },
      { name: 'Solved', value: this.state.tpCount },
    ];
    const chartColors = ['#E0DBFE', '#5A3FFF'];

    /* display tpHistory: traverse thru all the tpIds in tpHistory,
      display header (tp info) + tp preview that user can expand/collapse */
    const tps = tpHistory ? (
      Object.keys(tpHistory)
        .slice(0)
        .reverse()
        .map(tpId => {
          const tp = tpHistory[tpId];
          const isTpExpanded = this.state.tpExpand.has(tpId);
          if (tp) {
            return (
              <div className="profile-box" key={tpId}>
                <div
                  className={
                    (tp.total &&
                      tp.total > 0
                        ? "positive-score"
                        : tp.total < 0 && "negative-score")
                    + " profile-box-score"
                  }
                >
                  {tp.total}
                </div>
                <div className="profile-box-right">
                  <div className="profile-header">
                    <div className="profile-box-title">
                      Your answer to <b>#{tp.questId}: {questions[tp.questId].title}</b>
                    </div>
                    <div className="profile-btn-block">
                      <div>
                        {((tp.initial && tp.initial.length > length) ||
                          (tp.approach && tp.approach.length > length) ||
                          (tp.solution && tp.solution.length > length))
                        && this.generateMessage(isTpExpanded, tpId, 'tp')}
                      </div>
                      <Link
                        className="profile-open-thread profile-btn"
                        to={`/tp/${tp.questId}/${tpId}`}
                      >
                        <FontAwesomeIcon icon={faAlignLeft} />
                        {'\xa0'} Open Thread
                      </Link>
                      <div
                        className="profile-delete-btn profile-btn"
                        onClick={() => tpDelete({
                          firebase: this.props.firebase,
                          questId: tp.questId,
                          tpId,
                          uid: this.props.uid,
                        })}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        {'\xa0'}Delete
                      </div>
                    </div>
                  </div>
                  <em className="moment-posted"><Moment fromNow>{tp.date}</Moment></em>
                  <div className="profile-box-content">
                    <div className="profile-box-interior">
                      <TpPreview
                        initial={tp.initial}
                        approach={tp.approach}
                        solution={tp.solution}
                        expanded={isTpExpanded}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
    ) : (
      // display message if no TPs in tpHistory
      <div className="message-section">
        You haven't written any TPs yet. Go to our{' '}
        <Link className="message-link" to={`/questions`}>
          Questions
        </Link>{' '}
        page to choose a problem to solve!
      </div>
    );

    /* display feedbackHistory: traverse thru all the feedbackIds in
      feedbackHistory, display header (feedback info) + feedback preview that
      user can expand/collapse */
    const feedbacks = feedbackHistory ? (
      Object.keys(feedbackHistory)
        .slice(0)
        .reverse()
        .map((feedbackId) => {
          const {
            feedback,
            questId,
            tpId,
            username,
            date
          } = feedbackHistory[feedbackId];

          const score = feedbackHistory[feedbackId].score;
          const isFeedbackExpanded = this.state.feedbackExpand.has(feedbackId);

          if (feedback && username && questId && tpId) {
            return (
              <div className="profile-box" key={feedbackId}>
                <div className={
                  (score &&
                    score > 0
                      ? "positive-score"
                      : score < 0 && "negative-score")
                  + " profile-box-score"
                }>
                  {score}
                </div>
                <div className="profile-box-right">
                  <div className="profile-header">
                    <div className="profile-box-title">
                      Feedback to @{username}'s TP to <b>#{questId}: {questions[questId].title}</b>{' '}
                    </div>
                    <div className="profile-btn-block">
                      <div>
                        {feedback.length > length
                          && this.generateMessage(
                              isFeedbackExpanded,
                              feedbackId,
                              'feedback'
                            )}
                      </div>
                      <Link
                        className="profile-open-thread profile-btn"
                        smooth to={`/tp/${questId}/${tpId}#${feedbackId}`}
                      >
                        <FontAwesomeIcon icon={faAlignLeft} />
                        {'\xa0'} Open Thread
                      </Link>
                      <div
                        className="profile-delete-btn profile-btn"
                        onClick={() => feedbackDelete({
                          firebase: this.props.firebase,
                          tpId,
                          feedbackId,
                          uid: this.props.uid,
                        })}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        {'\xa0'}Delete
                      </div>
                    </div>
                  </div>
                  <Moment fromNow className="moment-posted">{date}</Moment>
                  <div className="profile-box-content">
                    <div
                      className={
                        "profile-box-interior" +
                        (isFeedbackExpanded ? " format-text" : "")
                      }
                    >
                      <Latex>
                        {isFeedbackExpanded
                          ? displayContent(feedback)
                          : displayContent(
                              feedback.slice(0, length + 1) +
                              (feedback.length > length ? '...' : '')
                        )}
                      </Latex>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        // display message if no feedback in feedbackHistory
        <div className="message-section">
          You haven't written any feedback yet. Go to our{' '}
          <Link className="message-link" to={`/questions`}>
            Questions
          </Link>{' '}
          page to choose a problem to give other users feedback on!
        </div>
      );

    /* display replyHistory: traverse thru all the replyIds in
      replyHistory, display header (reply info) + reply preview that
      user can expand/collapse */
    const replies = replyHistory ? (
      Object.keys(replyHistory)
        .slice(0)
        .reverse()
        .map(replyId => {
          const {
            questId,
            reply,
            replyFeedbackID,
            tpId,
            username,
            date,
          } = replyHistory[replyId];

          const score = replyHistory[replyId].score;
          const isReplyExpanded = this.state.replyExpand.has(replyId);

          if (reply && replyFeedbackID && username && questId && tpId) {
            return (
              <div className="profile-box" key={replyId}>
                <div
                  className={
                    (score &&
                      score > 0
                        ? "positive-score"
                        : score < 0 && "negative-score")
                    + " profile-box-score"
                  }
                >
                  {score}
                </div>
                <div className="profile-box-right">
                  <div className="profile-header">
                    <div className="profile-box-title">
                      Reply to @{username}{' • '}
                      <em><Moment fromNow>{date}</Moment></em>
                    </div>
                    <div className="profile-btn-block">
                      <div>
                        {reply.length > length
                          && this.generateMessage(
                              isReplyExpanded,
                              replyId,
                              'reply'
                            )}
                      </div>
                      <Link
                        className="profile-open-thread profile-btn"
                        smooth to={`/tp/${questId}/${tpId}#${replyId}`}
                      >
                        <FontAwesomeIcon icon={faAlignLeft} />
                        {'\xa0'} Open Thread
                      </Link>
                      <div
                        className="profile-delete-btn profile-btn"
                        onClick={() => replyDelete({
                          firebase: this.props.firebase,
                          tpId,
                          replyFeedbackID,
                          replyId,
                          uid: this.props.uid,
                        })}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        {'\xa0'} Delete 
                      </div>
                    </div>
                  </div>
                  <div className="moment-posted">In thread: TP for <span>Question #{questId}: {questions[questId].title}</span></div>
                  <div className="profile-box-content">
                    <div
                      className={
                        "profile-box-interior" +
                        (isReplyExpanded ? " format-text" : "")
                      }
                    >
                      <Latex>
                        {isReplyExpanded
                          ? displayContent(reply)
                          : displayContent(
                              reply.slice(0, length + 1) +
                              (reply.length > length ? '...' : '')
                        )}
                      </Latex>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        // display message if no reply in replyHistory
        <div className="message-section">
          You haven't written any replies yet. Go to our{' '}
          <Link className="message-link" to={`/questions`}>
            Questions
          </Link>{' '}
          page to choose a problem to reply to feedback on!
        </div>
      );

    // set display based on URL param
    const display =
      historyParam === "tp"
        ? tps
        : historyParam === "feedback"
        ? feedbacks
        : replies;

    const diffStats = Object.keys(this.state.difficultyStats).map((diff, i) => {
      return (
        <div className="tp-stats" key={i}>
          <div className="tp-stats-label">{diff}</div>
          <div 
            className={"tp-stats-number tp-stats-" + diff}>
            {this.state.difficultyStats[diff]}
          </div>
        </div>
      );
    });

    const tagStats = Object.keys(this.state.tagStats).map((tag, i) => {
      return (
        <div className="tp-stats" key={i}>
          <div className="tp-stats-label">{tag}</div>
          <div 
            className="tp-stats-number">
            {this.state.tagStats[tag]}
          </div>
        </div>
      );
    });

    return (
      <div sx={ProfileSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <ReactTitle
          title={
            historyParam === "tp"
              ? "Profile - TPs | Hireglyph"
              : (
                historyParam === "feedback"
                ? "Profile - Feedback | Hireglyph"
                : "Profile - Replies | Hireglyph"
              )
          }
        />
        <div className="page-container">
          <div className="history-block">
            <div className="history-header">
              {historyParam === 'tp' && <h6>TP History</h6>}
              {historyParam === 'feedback' && <h6>Feedback History</h6>}
              {historyParam === 'reply' && <h6>Reply History</h6>}
              {/* top buttons where users can change URL param */}
              <div className="sort-btn-block">
                <button
                  className="sort-btn tp-sort-btn"
                  disabled={historyParam === 'tp'}
                  onClick={() => this.handleTps('tp')}
                >
                  TPs
                </button>
                <button
                  className="sort-btn feedback-sort-btn"
                  disabled={historyParam === 'feedback'}
                  onClick={() => this.handleTps('feedback')}
                >
                  Feedback
                </button>
                <button
                  className="sort-btn reply-sort-btn"
                  disabled={historyParam === 'reply'}
                  onClick={() => this.handleTps('reply')}
                >
                  Replies
                </button>
              </div>
            </div>
            {/* main display */}
            {display}
          </div>
          <div className="profile-block">
            <div className="profile-container">
              <h6>Profile</h6>
              <div className="profile-stats">
                <div className="profile-stat">@{username}</div>
                <div className="profile-stat">{this.state.netUpvotes} upvotes</div>
              </div>
              <div>
                <div 
                  className="tp-stats-header"
                  onClick={this.onStatsDropdownClick}
                >
                  <div><b>{this.state.tpCount} TPs</b></div>
                  <div>
                    {this.state.showTpStats ?
                      <FontAwesomeIcon icon={faAngleRight} />
                      :
                      <FontAwesomeIcon icon={faAngleDown} />
                    }
                  </div>
                </div>
                {this.state.showTpStats &&
                  <div className="tp-stats-block">
                    <div className="solved-tps-block">
                      <div className="solved-tps-chart-label">Problems Solved</div>
                      <div className="solved-tps-chart-block">
                        <PieChart 
                          width={180} 
                          height={180} 
                          onMouseEnter={this.onPieEnter}
                          style={{transform: 'rotate(-90deg)'}}
                        >
                          <Pie
                            data={chartData}
                            cx={90}
                            cy={80}
                            innerRadius={50}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={chartColors[index % chartColors.length]} 
                              />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="solved-tps-chart-center">
                          <span style={{fontSize: '28px', fontFamily: 'Open-Sans-Bold'}}>{this.state.tpCount}</span> 
                          <span style={{color: 'gray'}}> / {this.props.questions.length}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="tag-stats">
                        {diffStats}
                      </div>
                      <div className="tag-stats">
                        {tagStats}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { profile, data } = state.firebase;
  const username = profile && profile.username;
  const { feedbackHistory, tpHistory, replyHistory } = data;
  const { historyParam } = props.match.params;

  return {
    feedbackHistory,
    historyParam,
    replyHistory,
    tpHistory,
    username,
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: '/tpHistory/' + props.uid,
      storeAs: 'tpHistory',
    },
    {
      path: '/feedbackHistory/' + props.uid,
      storeAs: 'feedbackHistory',
    },
    {
      path: '/replyHistory/' + props.uid,
      storeAs: 'replyHistory',
    }
  ]),
  connect(mapStateToProps)
)(PageProfile);
