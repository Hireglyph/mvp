import React from "react";
import { withRouter, Link } from "react-router-dom";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import { tags } from "../constants/Tags";
import Loading from "../components/Loading.js";

import "../styles/PageLanding.css";

class PageLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titles: "", loaded: false };
  }

  handleTagFilter = (tag) => {
    this.props.history.push(`/${tag}`);
  };

  render() {
    if (!isLoaded(this.props.questions)) {
      return <Loading />;
    }

    const { tag, questions, questionHistory } = this.props;

    const isDiff = tag == "easy" || tag == "medium" || tag == "hard";

    const easy = (
      <div>
        <div className="level1"></div>
        <div className="level2n"></div>
        <div className="level3n"></div>
      </div>
    );
    const medium = (
      <div>
        <div className="level1"></div>
        <div className="level2y"></div>
        <div className="level3n"></div>
      </div>
    );
    const hard = (
      <div>
        <div className="level1"></div>
        <div className="level2y"></div>
        <div className="level3y"></div>
      </div>
    );

    const quests = Object.keys(questions)
      .filter((questId) => !isDiff || questions[questId].difficulty === tag)
      .filter((questId) => isDiff || !tag || questions[questId].tags[tag])
      .map((questId) => {
        const quest = questions[questId];
        const answered = questionHistory && questionHistory[questId];

        const topics =
          quest.tags &&
          Object.keys(quest.tags).map((tag) => {
            return (
              <span className="topic" key={tag}>
                {tag}{" "}
              </span>
            );
          });

        let bars;
        if (quest.difficulty && quest.difficulty === "easy") {
          bars = easy;
        }
        if (quest.difficulty && quest.difficulty === "medium") {
          bars = medium;
        }
        if (quest.difficulty && quest.difficulty === "hard") {
          bars = hard;
        }

        return (
          <div className="question" key={questId}>
            <div>
              <Link className="question-title" to={`/q/${questId}/my`}>
                #{questId}: {quest.title} {answered ? "✔" : ""}
              </Link>
            </div>
            <br />
            <div className="topics">&nbsp;&nbsp;{topics}</div>
            <div>{bars}</div>
            <div></div>
            <br />
          </div>
        );
      });

    const tagButtons = tags.map((tag) => {
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
            </a>
            .
          </div>
          <br />
        </div>
        <br />
        <br />
        <div className="questions">
          <h1 className="header">Quantitative Analysis Questions</h1>
          <button onClick={() => this.handleTagFilter("")}>
            Original list
          </button>
          <button onClick={() => this.handleTagFilter("easy")}>
            Filter by easy
          </button>
          <button onClick={() => this.handleTagFilter("medium")}>
            Filter by medium
          </button>
          <button onClick={() => this.handleTagFilter("hard")}>
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

const mapStateToProps = (state, props) => {
  return {
    questions: state.firebase.data.questions,
    questionHistory: state.firebase.data.questionHistory,
    email: state.firebase.auth.email,
    tag: props.match.params.tag,
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    "/questions",
    {
      path: "/questionHistory/" + props.uid,
      storeAs: "questionHistory",
    },
  ]),
  connect(mapStateToProps)
)(PageLanding);
