/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactTitle } from 'react-meta-tags';
import Moment from 'react-moment';
import Latex from 'react-latex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCaretUp, faCaretDown,
        faPencilAlt, faUserFriends, faBullseye,
        faAngleDown, faTimes, faExpandAlt, 
        faCompressAlt, faAlignLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

import { currentVotes, upvoteTp, downvoteTp } from 'utils/vote';
import { displayContent } from 'utils/display';
import PageNotFound from 'pages/PageNotFound';
import TpPreview from 'components/TpPreview';
import QuestionPreview from 'components/QuestionPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';

import { QuestionSx } from 'theme/PageQuestionStyle';
import { PopupSx, QuestDisplaySx, ScoreArrowsSx, ThreadBoxSx } from 'theme/ComponentStyle.js';

const initialState = {
  initial: '',
  approach: '',
  solution: '',
  expand: new Set(),
  showAnswer: false,
  showAnswerConfirmation: false,
  showPreview: false,
  showTooltip: false,
};

class PageQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    // reset state if questId changes (navigation through relatedQuestions)
    if (prevProps.questId !== this.props.questId) {
      this.setState(initialState);
    }
  }

  // generate expand/collapse message
  generateMessage = (isExpanded, tpId) => {
    if (!isExpanded) {
      return (
        <div onClick={() => this.changeExpand(true, tpId)}>
          <FontAwesomeIcon icon={faExpandAlt} />
          <p className="vanish">{'\xa0'} Expand TP</p>
        </div>
      );
    }
    return (
      <div onClick={() => this.changeExpand(false, tpId)}>
        <FontAwesomeIcon icon={faCompressAlt} />
        <p className="vanish">{'\xa0'} Collapse TP</p>
      </div>
    );
  };

  displayTp = tpId => {
    const tp = this.props.tps[tpId];
    const username = tp && (tp.username ? tp.username : tp.creator);
    const expanded = this.state.expand.has(tpId);

    const { isUpvoted, isDownvoted } = currentVotes(tp, this.props.uid);
    const tpInfo = {tp, tpId, isUpvoted, isDownvoted, ...this.props};

    return tp && tp.creator && (
      <div className="tp-block" key={tpId} sx={ThreadBoxSx}>
        <div className="tp-arrows" sx={ScoreArrowsSx}>
          {/* upvote + downvote arrow and TP score */}
          <div
            className={(isUpvoted ? "upvoted-arrow" : "blank-arrow") + " fa-layers"}
            onClick={() => upvoteTp(tpInfo)}
          >
            <FontAwesomeIcon icon={faCaretUp} size="3x" />
          </div>
          <div>{tp.total}</div>
          <div
            className={(isDownvoted ? "downvoted-arrow" : "blank-arrow") + " fa-layers"}
            onClick={() => downvoteTp(tpInfo)}
          >
            <FontAwesomeIcon icon={faCaretDown} size="3x" />
          </div>
        </div>
        <div className="thread-box-interior">
          <div className="thread-box-header">
            <div className="tp-intro">
              <div 
                style={{fontFamily: 'Gotham-Bold'}}
              >
                @{window.innerWidth > 450 ? username : username.slice(0, 15)} •{'\xa0'}
              </div> 
              <em><Moment fromNow>{tp.date}</Moment></em>
            </div>
            <div className="thread-box-options">
              {(tp.initial && tp.initial.length > length) ||
              (tp.approach && tp.approach.length > length) ||
              (tp.solution && tp.solution.length > length)
                ? this.generateMessage(expanded, tpId)
                : ""}
              <Link
                className="see-feedback"
                to={`/tp/${this.props.questId}/${tpId}`}
              >
                <FontAwesomeIcon icon={faAlignLeft} />
                <p className="vanish">{'\xa0'} Open Thread</p>
              </Link>
            </div>
          </div>
          <div className="thread-box-divider"></div>
          <div className="thread-box-preview">
            <TpPreview
              initial={tp.initial}
              approach={tp.approach}
              solution={tp.solution}
              expanded={expanded}
            />
          </div>
        </div>
      </div>
    );
  };

  /* changing the URL between "top" TPs and "new" TPs
    also reset the expand variable in state */
  changeOrder = (sortBy) => {
    const questId = this.props.questId;
    this.setState({ expand: new Set() });
    this.props.history.push(`/q/${questId}/community/${sortBy}`);
  };

  // change whether or not popup is displayed
  displayPopup = (popup, display) => {
    this.setState({ [popup]: display });
  };

  // change whether or not the answer is displayed
  changeShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  // change whether or not a specific TP is expanded
  changeExpand = (value, tpId) => {
    const cloneSet = new Set(this.state.expand);
    value ? cloneSet.add(tpId) : cloneSet.delete(tpId);
    this.setState({ expand: cloneSet });
  };

  handleClick = (questParam) => {
    this.props.history.push(`/q/${this.props.questId}/${questParam}`);
  };

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  createTp = () => {
    const { questId, uid, username } = this.props;
    const difficulty = this.props.question && this.props.question.difficulty;
    const { approach, initial, solution } = this.state;

    const tpId = this.props.firebase.push(`/tps/${questId}`).key;
    const updates = {};
    // only solution if "easy" question, otherwise initial/approach/solution
    const tp =
      difficulty === "easy"
        ? { creator: uid, solution, total: 0, username, date: Date() }
        : { approach, creator: uid, initial, solution, total: 0, username, date: Date() };
    const profileTp =
      difficulty === "easy"
        ? { questId, solution, total: 0, date: Date() }
        : { approach, initial, questId, solution, total: 0, date: Date() };

    updates[`/tps/${questId}/${tpId}`] = tp;
    updates[`/tpHistory/${uid}/${tpId}`] = profileTp;
    updates[`/questionHistory/${uid}/${questId}`] = true;

    /* signal in TpWrapper to re-sort/freeze array of TpId's for the questId
      so that the TP is at the top of "new" community TPs (in state) */
    const onComplete = () => {
      this.props.tpCreated();
      this.setState(initialState);
      this.props.history.push(`/q/${questId}/community/new`);
    };
    this.props.firebase.update("/", updates, onComplete);
  };

  displayTooltip = (display) => {
    this.setState({ showTooltip: display });
  };

  render() {
    const {
      question,
      onboarded,
      questId,
      questIsLoaded,
      questParam,
      relatedQuestions,
      sortBy,
      tps,
      uid,
      keys,
      time,
    } = this.props;
    const {
      answer,
      description,
      difficulty,
      tags,
      title
    } = question || {};
    const {
      approach,
      initial,
      showAnswer,
      solution,
    } = this.state;

    if (!questIsLoaded || !isLoaded(relatedQuestions)) {
      return <Loading />;
    }

    if (isEmpty(question)) {
      return <PageNotFound />;
    }

    if (
      (questParam === "community" && !sortBy) ||
      (sortBy && sortBy !== "top" && sortBy !== "new")
    ) {
      return <Redirect to={`/q/${questId}/community/top`} />;
    }

    if (
      !sortBy &&
      questParam !== "my" &&
      questParam !== "community" &&
      questParam !== "related"
    ) {
      return <Redirect to={`/q/${questId}/my`} />;
    }

    const topics =
      tags &&
      Object.keys(tags).map((tag) => {
        return (
          // link to go to questions page, sorted by the tag clicked on
          <Link to={`/questions?tag=${tag}`} className="tag purple" key={tag}>
            {tag}
          </Link>
        );
      });

    const relatedQs =
      relatedQuestions &&
      Object.keys(relatedQuestions).map((questId) => {
        return (
          <div key={questId}>
            <QuestionPreview questId={questId} uid={uid} />
          </div>
        );
      });

    // if question has an answer, display "See answer"
    // and the answer itself, depending on state
    const answerDisplay = answer && (
      <div>
        <span
          className="answer-display"
          onClick={() => {
            if (!this.state.showAnswer) this.displayPopup('showAnswerConfirmation', true);
            else this.changeShowAnswer();
          }}
        >
          <FontAwesomeIcon icon={showAnswer ? faAngleRight : faAngleDown} style={{marginRight: '10px'}} /> 
          See answer
        </span>
        {showAnswer && <div sx={{ marginLeft: '15px' }}>{answer}</div>}
      </div>
    );

    // confirmation popup for viewing answer
    const answerDisplayPopup = (
      <div className="popup-container">
        <div className="popup-box">
          <FontAwesomeIcon 
            icon={faTimes} 
            className="popup-x-icon" 
            onClick={() => this.displayPopup('showAnswerConfirmation', false)}
          />
          <div className="popup-title">Are you sure you want to see the answer?</div>
          <div className="popup-text">
            We<em> strongly </em>recommend that you write 
            your own TP before viewing the answer.
          </div>
          <div className="popup-btn-container">
            <button 
              className="popup-btn popup-red-btn"
              onClick={() => {
                this.changeShowAnswer();
                this.displayPopup('showAnswerConfirmation', false);
              }}
            >
              Yes
            </button>
            <button 
              className="popup-btn"
              onClick={() => 
                this.displayPopup('showAnswerConfirmation', false)
              }
            >
              No
            </button>
          </div>
        </div>
      </div>
    );

    // tp preview
    const previewPopup = (
      <div className="popup-container">
        <div className="popup-box">
          <FontAwesomeIcon 
            icon={faTimes} 
            className="popup-x-icon" 
            onClick={() => this.displayPopup('showPreview', false)}
          />
          <div className="popup-title">TP Preview</div>
          {difficulty !== "easy" &&
            <div className="popup-text">
              <b className="popup-bold">Initial: </b>
              <Latex>{displayContent(this.state.initial)}</Latex>
            </div>
          }
          {difficulty !== "easy" &&
            <div className="popup-text">
              <b>Approaches: </b>
              <Latex>{displayContent(this.state.approach)}</Latex>
            </div>
          }
          <div className="popup-text">
            <b>Final: </b>
            <Latex>{displayContent(this.state.solution)}</Latex>
          </div>
        </div>
      </div>
    );

    // message if no TPs for the question (or all TPs are deleted)
    const noTps =
      <div className="message-section no-tps">
        There are no TPs yet for this question. Be the first to write one!
      </div>;

    let tpsByVote = tps && keys.map((tpId) => this.displayTp(tpId));
    let tpsByTime = tps && time.map((tpId) => this.displayTp(tpId));

    // set display variables to noTps if there are no TPs for the question
    // or all "TPs" in database are "deleted"
    if (!tpsByVote || !tpsByVote.some(tp => tp)) {
      tpsByVote  = noTps;
      tpsByTime = noTps;
    }

    const communityTps = (
      <div className="communityTps-container">
        <div className="communityTps-header">
          <div className="tps-section-header"><b>Thought Processes (TPs)</b></div>
          {/* buttons to sort by "new" and "top" TPs */}
          <div className="sort-btn-block">
            <button
              className="sort-btn top-sort-btn"
              disabled={sortBy === "top"}
              onClick={() => this.changeOrder("top")}
            >
              Top
            </button>
            <button
              className="sort-btn new-sort-btn"
              disabled={sortBy === "new"}
              onClick={() => this.changeOrder("new")}
            >
              New
            </button>
          </div>
        </div>
        {/* display tpsByVote or tpsByTime */}
        {sortBy === "top" ? tpsByVote : tpsByTime}
      </div>
    );

    const myTp =
      difficulty === "easy" ? (
        // only solution if "easy" question
        <div className="myTp-container">
          <TextareaAutosize
            className="my-tp-textarea"
            minRows={5}
            name="solution"
            placeholder="Final solution..."
            onChange={this.handleChange}
            value={solution}
          />
          <div className="tp-btn-container">
            <button
              className="tp-btn"
              disabled={solution.trim() === ""}
              onClick={
                () => this.displayPopup('showPreview', true)
              }
            >
              Preview
            </button>
            <button
              className="tp-btn"
              disabled={solution.trim() === ""}
              onClick={this.createTp}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        // otherwise, have initial/approach/solution
        <div className="myTp-container">
          <div className="myTp-header">
            <div>
              Type out your 
              <span style={{fontWeight: 'bolder', color: 'black'}} > Thought Process (TP) </span> 
              for this question below. 
              <FontAwesomeIcon 
                icon={faQuestionCircle} 
                className="purple" 
                style={{marginLeft: '10px'}} 
                onMouseEnter={
                  () => this.displayTooltip(true)
                }  
                onMouseLeave={
                  () => this.displayTooltip(false)
                }
                onMouseOver={
                  () => this.displayTooltip(true)
                }
              />
            </div>
            {this.state.showTooltip &&
              <div 
                className="tp-tooltip"
                onMouseEnter={
                  () => this.displayTooltip(true)
                }  
                onMouseLeave={
                  () => this.displayTooltip(false)
                }
                onMouseOver={
                  () => this.displayTooltip(true)
                }
              >
                We use this three-box structure in order to simulate how you would 
                present your problem-solving in a real interview setting. Click to 
                read more about our methodology.
              </div>
            }
            <div style={{color: 'gray', margin: '10px 0'}}>
              Use $$latex formula$$ for LaTeX.
            </div>
          </div>
          <TextareaAutosize
            className="my-tp-textarea"
            minRows={5}
            name="initial"
            placeholder="Initial thoughts..."
            onChange={this.handleChange}
            value={initial}
          />
          <TextareaAutosize
            className="my-tp-textarea"
            minRows={5}
            name="approach"
            placeholder="Different approaches..."
            onChange={this.handleChange}
            value={approach}
          />
          <TextareaAutosize
            className="my-tp-textarea"
            minRows={5}
            name="solution"
            placeholder="Final solution..."
            onChange={this.handleChange}
            value={solution}
          />
          <div className="tp-btn-container">
            <button
              className="tp-btn"
              disabled={
                initial.trim() === "" ||
                approach.trim() === "" ||
                solution.trim() === ""
              }
              onClick={
                () => this.displayPopup('showPreview', true)
              }
            >
              Preview
            </button>
            <button
              className="tp-btn"
              disabled={
                initial.trim() === "" ||
                approach.trim() === "" ||
                solution.trim() === ""
              }
              onClick={this.createTp}
            >
              Submit
            </button>
          </div>
        </div>
      );

    // set display based on URL parameter
    let section;
    if (questParam === "my") {
      section = myTp;
    } else if (questParam === "related") {
      section = relatedQs;
    } else {
      section = communityTps;
    }

    // do not display TP workspace or community TPs if
    // not logged in, not onboarded, or not verified
    if (!uid) {
      section = (
        <div className="message-section">
          You must log in or register before writing
          your own TP or accessing community TPs.
        </div>
      );
    } else if (!onboarded) {
      section = (
        <div className="message-section">
          You must set your username on the {' '}
          <Link
            to={`/profile`}
          >
            Profile
          </Link>
          {' '} page before writing your own TP or
          accessing community TPs.
        </div>
      );
    } else if (!this.props.emailVerified) {
      section = (
        <div className="message-section">
          You must verify your email on the {' '}
          <Link
            to={`/profile`}
          >
            Profile
          </Link>
          {' '} page before writing your own TP or
          accessing community TPs.
        </div>
      );
    }

    return (
      <div sx={QuestionSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <ReactTitle
          title={`#${this.props.questId}: ${title} | Hireglyph`}
        />
        <div 
          className="page-container" 
          id={(this.state.showAnswerConfirmation || this.state.showPreview) ?
            "no-scroll" : ""
          }
        >
          {/* question block: title, tags, description, difficulty, solved checkmark? */}
          <div className="question-block">
            <div>
              <div className="question-title">
                #{this.props.questId}: {title}{' '}
                {this.props.solved && <FontAwesomeIcon icon={faCheck} className="check" />}
              </div>
              <div className="tag-container">
                <div className={difficulty + ' tag'}>{difficulty}</div>
                {topics}
              </div>
              <div className="question-description">
                {description}
              </div>
            </div>
            <div>{answerDisplay}</div>
          </div>
          {/* display block: buttons on top, and section (TP workspace, community TPs,
            or related questions) on the bottom */}
          <div className="display-block">
            <div className="question-btn-container">
              <button
                className="question-btn"
                disabled={questParam === "my"}
                onClick={() => this.handleClick("my")}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
                {" "}<p className="button-text">My TP</p>
              </button>
              <button
                className="question-btn"
                disabled={sortBy}
                onClick={() => this.handleClick("community/top")}
              >
                <FontAwesomeIcon icon={faUserFriends} />
                {" "}<p className="button-text">Community TPs</p>
              </button>
              <button
                className="question-btn"
                disabled={questParam === "related"}
                onClick={() => this.handleClick("related")}
              >
                <FontAwesomeIcon icon={faBullseye} />
                {" "}<p className="button-text">Related Questions</p>
              </button>
              <div className="question-border" />
            </div>
            <div sx={QuestDisplaySx} className={questParam + "-quest-container" }>
              {section}
            </div>
          </div>
        </div>
        {this.state.showAnswerConfirmation &&
          <div sx={PopupSx}>{answerDisplayPopup}</div>
        }
        {this.state.showPreview &&
          <div sx={PopupSx}>{previewPopup}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { questId } = props.match.params;
  const { data, profile } = state.firebase;

  const relatedQuestions =
    data.relatedQuestions && data.relatedQuestions[questId];
  const solved = data.questionHistory && data.questionHistory[questId];

  return { relatedQuestions, solved, username: profile && profile.username };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    return [
      { path: `/relatedQuestions/${props.questId}` },
    ];
  }),
  connect(mapStateToProps)
)(PageQuestion);
