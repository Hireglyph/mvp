/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextareaAutosize from 'react-textarea-autosize';

import { currentVotes, upvoteTp, downvoteTp } from 'utils/vote';

import PageNotFound from 'pages/PageNotFound';
import TpPreview from 'components/TpPreview';
import QuestionPreview from 'components/QuestionPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';

const QuestionSx = {
  display: 'flex',
  fontFamily: 'Open-Sans',

  '.question-block': {
    width: '300px',
  },

  '.display-block': {
    width: '400px',
  },

  '.score-center': {
    textAlign: 'center',
    marginTop: '5px',
    marginBottom: '5px',
  },

  '.green-upvote': {
    width: '0px',
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '15px solid #00FF00',
    position: 'relative',
    left: '-15px',
    bottom: '-2px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
  },

  '.white-upvote': {
    width: '0px',
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '15px solid #A9A9A9',
    position: 'relative',
    left: '-15px',
    bottom: '-2px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
  },

  '.red-downvote': {
    width: '0px',
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid red',
    position: 'relative',
    left: '-15px',
    bottom: '17px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
  },

  '.white-downvote': {
    width: '0px',
    height: '0px',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid #A9A9A9',
    position: 'relative',
    left: '-15px',
    bottom: '17px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
  },

  '.upvote-border': {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '0px',
    height: '0px',
    borderLeft: '19px solid transparent',
    borderRight: '19px solid transparent',
    borderBottom: '19px solid black',
  },

  '.downvote-border': {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '0px',
    height: '0px',
    borderLeft: '19px solid transparent',
    borderRight: '19px solid transparent',
    borderTop: '19px solid black',
  },
};

const initialState = {
  initial: '',
  approach: '',
  solution: '',
  loading: true,
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

    if (this.props.tps && !this.state.loading) {
      let list = {};
      Object.keys(this.props.tps).forEach((tpId) => (list[tpId] = false));
      this.setState({
        expand: list,
        loading: false,
      });
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
      <div key={tpId}>
        <div>@{username}</div>
        <div>
          <div className="upvote-border">
            <div
              className={isUpvoted ? "green-upvote" : "white-upvote"}
              onClick={() => upvoteTp(tpInfo)}
            />
          </div>
          <div className="score-center">{tp.total}</div>
          <div className="downvote-border">
            <div
              className={isDownvoted ? "red-downvote" : "white-downvote"}
              onClick={() => downvoteTp(tpInfo)}
            />
          </div>
        </div>
        <TpPreview
          initial={tp.initial}
          approach={tp.approach}
          solution={tp.solution}
          expanded={expanded}
        />
        <div>
          {(tp.initial && tp.initial.length > length) ||
          (tp.approach && tp.approach.length > length) ||
          (tp.solution && tp.solution.length > length)
            ? this.generateMessage(expanded, tpId)
            : ""}
          <Link
            to={`/tp/${this.props.questId}/${tpId}`}
          >
            Go to full TP
          </Link>
        </div>
      </div>
    ) : (
      null
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
          <Link to={`/questions/${tag}`} key={tag}>
            {tag}
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
        <div>
          <div>
            Enter your Thought Process below:
          </div>
          <TextareaAutosize
            minRows={3}
            name="solution"
            placeholder="Final solution!"
            onChange={this.handleChange}
            value={solution}
          />
          <button
            disabled={solution.trim() === ""}
            onClick={this.createTp}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div>
            Enter your Thought Process below:
          </div>
          <TextareaAutosize
            minRows={3}
            name="initial"
            placeholder="What were your initial thoughts?"
            onChange={this.handleChange}
            value={initial}
          />
          <TextareaAutosize
            minRows={3}
            name="approach"
            placeholder="Different approaches you tried..."
            onChange={this.handleChange}
            value={approach}
          />
          <TextareaAutosize
            minRows={3}
            name="solution"
            placeholder="Final solution!"
            onChange={this.handleChange}
            value={solution}
          />
          <button
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
        <div>
          <p>You need to log in or register to write your own TP.</p>
        </div>
      );
    } else if (!onboarded) {
      section = (
        <div>
          <p>
            You need to set your username on the &nbsp;
            <Link to={`/profile`}>Profile</Link>
            &nbsp; page before writing your own TP.
          </p>
        </div>
      );
    } else if (!this.props.emailVerified) {
      section = (
        <div>
          <p>
            You need to verify your email on the &nbsp;
            <Link to={`/profile`}>Profile</Link>
            &nbsp; page before writing your own TP.
          </p>
        </div>
      );
    }

    return (
      <div sx={QuestionSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div className="question-block">
          <div>
            #{this.props.questId}: {title}{" "}
            {this.props.solved ? "✔" : ""}
          </div>
          <div>
            {description}
          </div>
          <div>{difficulty}</div>
          <div>{topics}</div>
          <div>{answerDisplay}</div>
        </div>
        <div>
          <div>
            <button
              disabled={questParam === "my"}
              onClick={() => this.handleClick("my")}
            >
              My TP
            </button>
            <button
              disabled={sortBy}
              onClick={() => this.handleClick("community/top")}
            >
              Community TPs
            </button>
            <button
              disabled={questParam === "related"}
              onClick={() => this.handleClick("related")}
            >
              Related Questions
            </button>
          </div>
          <div className="display-block">
            {section}
          </div>
        </div>
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
