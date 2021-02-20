import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextareaAutosize from 'react-textarea-autosize';

import { currentVotes, upvoteTp, downvoteTp } from 'utils/vote';

import TpPreview from 'components/TpPreview';
import QuestionPreview from 'components/QuestionPreview';
import PageNotFound from 'pages/PageNotFound';
import Loading from 'components/Loading';
import red from 'assets/images/red-downvote.png';
import green from 'assets/images/green-upvote.png';
import upvote from 'assets/images/upvote.png';
import downvote from 'assets/images/downvote.png';
import { length } from 'constants/PrevLength';

import 'styles/PageQuestion.css';

const initialState = {
  initial: '',
  approach: '',
  solution: '',
  loading: true,
  keys: [],
  time: [],
  expand: {},
  showAnswer: false,
};

class PageQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.questId !== this.props.questId) {
      this.setState(initialState);
    }

    if (prevState.loading && isLoaded(this.props.tps)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);
      this.setState({ loading: false, keys });
      if (this.props.tps) {
        let list = {};
        Object.keys(this.props.tps).forEach((tpId) => (list[tpId] = false));
        this.setState({
          time: Object.keys(this.props.tps).reverse(),
          expand: list,
        });
      }
    }
  }

  generateMessage = (isExpanded, tpId) => {
    if (!isExpanded) {
      return <div onClick={() => this.changeExpand(true, tpId)}>Expand TP</div>;
    }
    return (
      <div onClick={() => this.changeExpand(false, tpId)}>Collapse TP</div>
    );
  };

  displayTp = tpId => {
    const tp = this.props.tps[tpId];
    const username = tp && (tp.username ? tp.username : tp.creator);
    const expanded = this.state.expand[tpId];

    const { isUpvoted, isDownvoted } = currentVotes(tp, this.props.uid);
    const tpInfo = {tp, tpId, isUpvoted, isDownvoted, ...this.props};

    return tp ? (
      <div className="individual-tp-preview" key={tpId}>
        <div className="main-tp-text">
          <div className="tp-preview-username">@{username}</div>
          <TpPreview
            initial={tp.initial}
            approach={tp.approach}
            solution={tp.solution}
            expanded={expanded}
          />
          <div className="align-right">
            {(tp.initial && tp.initial.length > length) ||
            (tp.approach && tp.approach.length > length) ||
            (tp.solution && tp.solution.length > length)
              ? this.generateMessage(expanded, tpId)
              : ""}
            <Link
              className="tp-full-goto"
              to={`/tp/${this.props.questId}/${tpId}`}
            >
              Go to full TP
            </Link>
          </div>
        </div>
        <img
          alt="upvote"
          className="feedback-upvote-button"
          src={isUpvoted ? green : upvote}
          onClick={() => upvoteTp(tpInfo)}
        />
        <div className="feedback-score-text">{tp.total}</div>
        <img
          alt="downvote"
          className="feedback-downvote-button"
          src={isDownvoted ? red : downvote}
          onClick={() => downvoteTp(tpInfo)}
        />
        <br />
      </div>
    ) : (
      <div key={tpId}></div>
    );
  };

  changeOrder = (sortBy) => {
    const { questId, tps } = this.props;
    if (tps) {
      let list = {};
      Object.keys(tps).forEach((tpId) => (list[tpId] = false));
      this.setState({ expand: list });
    }
    this.props.history.push(`/q/${questId}/community/${sortBy}`);
  };

  changeShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  changeExpand = (value, tpId) => {
    this.setState({ expand: { ...this.state.expand, [tpId]: value } });
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
    const tp =
      difficulty === "easy"
        ? { creator: uid, solution, total: 0, username }
        : { approach, creator: uid, initial, solution, total: 0, username };
    const tp2 =
      difficulty === "easy"
        ? { questId, solution, total: 0 }
        : { approach, initial, questId, solution, total: 0 };

    updates[`/tps/${questId}/${tpId}`] = tp;
    updates[`/tpHistory/${uid}/${tpId}`] = tp2;
    updates[`/questionHistory/${uid}/${questId}`] = true;

    const onComplete = () => {
      this.props.history.push(`/tp/${questId}/${tpId}`);
    };
    this.props.firebase.update("/", updates, onComplete);
  };

  render() {
    const {
      question,
      onboarded,
      questId,
      questParam,
      relatedQuestions,
      sortBy,
      tps,
      uid,
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
      keys,
      showAnswer,
      solution,
      time
    } = this.state;

    if (!isLoaded(question) || !isLoaded(tps)) {
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
          <Link to={`/questions/${tag}`} key={tag}>
            <span className="topic-2">{tag} </span>
          </Link>
        );
      });

    const relatedQs =
      relatedQuestions &&
      Object.keys(relatedQuestions).map((questId) => {
        return <QuestionPreview questId={questId} uid={uid} key={questId} />;
      });

    const answerDisplay = answer && (
      <div>
        <div onClick={() => this.changeShowAnswer()}>Click to see answer</div>
        <div>{showAnswer ? answer : ""}</div>
      </div>
    );

    const tpsByVote =
      tps &&
      keys.map((tpId) => {
        if (tps[tpId] && !tps[tpId].creator) {
          return <div key={tpId}></div>;
        }
        return this.displayTp(tpId);
      });

    const tpsByTime =
      tps &&
      time.map((tpId) => {
        if (tps[tpId] && !tps[tpId].creator) {
          return <div key={tpId}></div>;
        }
        return this.displayTp(tpId);
      });

    const communityTps = (
      <div>
        <button
          disabled={sortBy === "top"}
          onClick={() => this.changeOrder("top")}
        >
          Top TPs
        </button>
        <button
          disabled={sortBy === "new"}
          onClick={() => this.changeOrder("new")}
        >
          New TPs
        </button>
        {sortBy === "top" ? tpsByVote : tpsByTime}
      </div>
    );

    const myTp =
      difficulty === "easy" ? (
        <div className="my-tp-submit">
          <p className="tp-instructions-text">
            Enter your Thought Process below:
          </p>
          <TextareaAutosize
            minRows={3}
            className="tp-input-box"
            name="solution"
            placeholder="Final solution!"
            onChange={this.handleChange}
            value={solution}
          />
          <br />
          <br />
          <button
            className="tp-submit-green"
            disabled={solution.trim() === ""}
            onClick={this.createTp}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="my-tp-submit">
          <p className="tp-instructions-text">
            Enter your Thought Process below:
          </p>
          <TextareaAutosize
            minRows={3}
            className="tp-input-box"
            name="initial"
            placeholder="What were your initial thoughts?"
            onChange={this.handleChange}
            value={initial}
          />

          <TextareaAutosize
            minRows={3}
            className="tp-input-box"
            name="approach"
            placeholder="Different approaches you tried..."
            onChange={this.handleChange}
            value={approach}
          />

          <TextareaAutosize
            minRows={3}
            className="tp-input-box"
            name="solution"
            placeholder="Final solution!"
            onChange={this.handleChange}
            value={solution}
          />
          <br />
          <br />
          <button
            className="tp-submit-green"
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
      );

    let section;
    if (questParam === "my") {
      section = myTp;
    } else if (questParam === "related") {
      section = relatedQs;
    } else {
      section = communityTps;
    }

    if (!uid) {
      section = (
        <div className="login-message">
          <p>You need to log in or register to write your own TP.</p>
        </div>
      );
    } else if (!onboarded) {
      section = (
        <div className="login-message">
          <p>
            You need to set your username on the &nbsp;
            <Link to={`/profile`}>Profile</Link>
            &nbsp; page before writing your own TP.
          </p>
        </div>
      );
    } else if (!this.props.emailVerified) {
      section = (
        <div className="login-message">
          <p>
            You need to verify your email on the &nbsp;
            <Link to={`/profile`}>Profile</Link>
            &nbsp; page before writing your own TP.
          </p>
        </div>
      );
    }

    return (
      <div>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div className="question-block">
          <div className="question-title-2">
            <h1>
              #{this.props.questId}: {title}{" "}
              {this.props.solved ? "✔" : ""}
            </h1>
          </div>
          <div className="question-description">
            <p>{description}</p>
          </div>
          <div>{difficulty}</div>
          <div className="topics-2">{topics}</div>
          <div>{answerDisplay}</div>
        </div>
        <div>
          <button
            className="my-tp-button-1"
            disabled={questParam === "my"}
            onClick={() => this.handleClick("my")}
          >
            My TP
          </button>
          <button
            className="community-tp-button-1"
            disabled={sortBy}
            onClick={() => this.handleClick("community/top")}
          >
            Community TPs
          </button>
          <button
            className="related-qs-button-1"
            disabled={questParam === "related"}
            onClick={() => this.handleClick("related")}
          >
            Related Questions
          </button>
          <hr
            className={questParam === "my" ? "divider-line" : "divider-line-2"}
          />
        </div>
        <div className={questParam === "my" ? "px-break" : "px-break-2"}>
          {section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { questId, questParam, sortBy } = props.match.params;
  const { data, profile } = state.firebase;
  const { username } = profile || {};

  const question = data.questions && data.questions[questId];
  const tps = data.tps && data.tps[questId];
  const relatedQuestions =
    data.relatedQuestions && data.relatedQuestions[questId];
  const solved = data.questionHistory && data.questionHistory[questId];

  return {
    question,
    questId,
    questParam,
    sortBy,
    tps,
    solved,
    username,
    relatedQuestions,
  };
};

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??
export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [
      {
        path: `/tps/${questId}`,
        storeAs: `tps/${questId}`
        // COMMENT FOR LATER: this 'storeAs' is for the bug!
      },
      { path: `/relatedQuestions/${questId}` },
    ];
  }),
  connect(mapStateToProps)
)(PageQuestion);
