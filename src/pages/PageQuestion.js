/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextareaAutosize from 'react-textarea-autosize';

import { currentVotes, upvoteTp, downvoteTp } from 'utils/vote';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import PageNotFound from 'pages/PageNotFound';
import TpPreview from 'components/TpPreview';
import QuestionPreview from 'components/QuestionPreview';
import Loading from 'components/Loading';
import { length } from 'constants/PrevLength';

const QuestionSx = {
  display: 'flex',
  alignItems: 'flex-start',
  fontFamily: 'Open-Sans',
  width: '950px',
  gap: '25px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',

  '.check': {
    color: 'easyGreen',
  },

  '.question-block': {
    position: 'sticky',
    top: '112px',
    height: '500px',
    maxHeight: 'calc(100vh - 162px)',
    overflowY: 'auto',
    width: '400px',
    backgroundColor: 'white',
    paddingRight: '40px',
    paddingLeft: '40px',
    paddingTop: '60px',
    paddingBottom: '60px',
  },

  '.question-title': {
    fontSize: '20px',
    marginBottom: '15px',
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
    marginBottom: '15px',
  },

  '.question-description': {
    fontFamily: 'Gotham-Book',
    marginBottom: '15px',
  },

  '.display-block': {
    width: '525px',
  },

  '.tag-container': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '15px',
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
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },

  '.answer-display': {
    fontSize: '12px',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
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

  '.question-button': {
    width: '33.3%',
    height: '35px',
    backgroundColor: 'lightGrey',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontFamily: 'Open-Sans',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkGrey',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
    },
  },

  '.middle-button': {
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
  },

  '.orange-line': {
    width: '100%',
    height: '10px',
    backgroundColor: 'orange',
  },

  '.myTp-background': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  '.my-tp': {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '15px',
    paddingRight: '10px',
    paddingLeft: '10px',
    resize: 'vertical',
    lineHeight: '20px',
    fontSize: '15px',
    fontFamily: 'Open-Sans',
    border: 'none',
  },

  '.tp-submit-button': {
    height: '30px',
    width: '100px',
    backgroundColor: 'orange',
    color: 'black',
    fontFamily: 'Open-Sans',
    cursor: 'pointer',
    border: 'none',
    marginRight: '50px',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
    '&:disabled': {
      backgroundColor: 'darkGrey',
      cursor: 'default',
    },
  },

  '.communityTps-background': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    paddingBottom: '15px',
  },

  '.sort-button-block': {
    display: 'flex',
    marginRight: '50px',
    marginLeft: 'auto',
    marginBottom: '15px',
  },

  '.sort-button': {
    border: '1px solid #8E8E8E',
    cursor: 'pointer',
    backgroundColor: 'white',
    width: '75px',
    color: 'black',
    fontFamily: 'Open-Sans',
    fontSize: '15px',
    height: '25px',
    lineHeight: '15px',
    '&:hover': {
      backgroundColor: 'darkGrey',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
    },
  },

  '.tp-header': {
    display: 'flex',
  },

  '.expand-collapse': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    marginRight: '0px',
    marginLeft: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '.see-feedback': {
    color: 'black',
    backgroundColor: 'white',
    fontStyle: 'italic',
    width: '150px',
    paddingLeft: '5px',
  },

  '.see-feedback-link': {
    color: 'black',
  },

  '.tp-preview': {
    backgroundColor: 'white',
    padding: '5px',
    fontFamily: 'Gotham-Book',
  },

  '.tp-interior':{
    overflow: 'hidden',
    width: '100%',
  },

  '.tp-arrows-width': {
    width: '80px',
  },

  '.tp-block': {
    display: 'flex',
    minHeight: '60px',
    marginBottom: '30px',
    marginRight: '60px',
  },

  '.message-section': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    padding: '30px',
    fontStyle: 'italic',
  },

  '.message-link': {
    color: 'darkOrange',
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

    return tp && (
      <div className="tp-block" key={tpId}>
        <div className="tp-arrows-width">
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
        <div className="tp-interior">
          <div className="tp-header">
            <div>@{username}</div>
            <div className="expand-collapse">
              {(tp.initial && tp.initial.length > length) ||
              (tp.approach && tp.approach.length > length) ||
              (tp.solution && tp.solution.length > length)
                ? this.generateMessage(expanded, tpId)
                : ""}
            </div>
          </div>
          <div className="tp-preview">
            <TpPreview
              initial={tp.initial}
              approach={tp.approach}
              solution={tp.solution}
              expanded={expanded}
            />
          </div>
          <div className="see-feedback">
            <Link
              className="see-feedback-link"
              to={`/tp/${this.props.questId}/${tpId}`}
            >
              See Feedback...
            </Link>
          </div>
        </div>
      </div>
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
          <Link to={`/questions/${tag}`} className="tag" key={tag}>
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
        <span
          className="answer-display"
          onClick={() => this.changeShowAnswer()}
        >
          {showAnswer ? '▼' : '►'}
          &nbsp;See answer
        </span>
        {showAnswer && <div sx={{ marginLeft: '15px' }}>{answer}</div>}
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
      <div className="communityTps-background">
        <div className="sort-button-block">
          <button
            className="sort-button"
            disabled={sortBy === "top"}
            onClick={() => this.changeOrder("top")}
          >
            Top
          </button>
          <button
            className="sort-button"
            disabled={sortBy === "new"}
            onClick={() => this.changeOrder("new")}
          >
            New
          </button>
        </div>
        {sortBy === "top" ? tpsByVote : tpsByTime}
      </div>
    );

    const myTp =
      difficulty === "easy" ? (
        <div className="myTp-background">
          <TextareaAutosize
            className="my-tp"
            minRows={5}
            name="solution"
            placeholder="Final solution..."
            onChange={this.handleChange}
            value={solution}
          />
          <button
            className="tp-submit-button"
            disabled={solution.trim() === ""}
            onClick={this.createTp}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="myTp-background">
          <TextareaAutosize
            className="my-tp"
            minRows={5}
            name="initial"
            placeholder="Initial thoughts..."
            onChange={this.handleChange}
            value={initial}
          />
          <TextareaAutosize
            className="my-tp"
            minRows={5}
            name="approach"
            placeholder="Different approaches..."
            onChange={this.handleChange}
            value={approach}
          />
          <TextareaAutosize
            className="my-tp"
            minRows={5}
            name="solution"
            placeholder="Final solution..."
            onChange={this.handleChange}
            value={solution}
          />
          <button
            className="tp-submit-button"
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
        <div className="message-section">
          You need to log in or register before writing
          your own TP or accessing community TPs.
        </div>
      );
    } else if (!onboarded) {
      section = (
        <div className="message-section">
          You need to set your username on the {' '}
          <Link
            className="message-link"
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
          You need to verify your email on the {' '}
          <Link
            className="message-link"
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
        <div className="question-block">
          <div className="question-title">
            #{this.props.questId}: {title}{" "}
            {this.props.solved && <FontAwesomeIcon icon={faCheck} className="check" />}
          </div>
          <div className={difficulty + ' difficulty'}>{difficulty.toUpperCase()}</div>
          <div className="question-description">
            {description}
          </div>
          <div className="tag-container">{topics}</div>
          <div>{answerDisplay}</div>
        </div>
        <div className="display-block">
          <div>
            <button
              className="question-button"
              disabled={questParam === "my"}
              onClick={() => this.handleClick("my")}
            >
              My TP
            </button>
            <button
              className="question-button middle-button"
              disabled={sortBy}
              onClick={() => this.handleClick("community/top")}
            >
              Community TPs
            </button>
            <button
              className="question-button"
              disabled={questParam === "related"}
              onClick={() => this.handleClick("related")}
            >
              Related Questions
            </button>
          </div>
          <div className="orange-line"/>
          <div>
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
