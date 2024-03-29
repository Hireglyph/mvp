import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { tags, companies } from 'constants/Lists';
import Loading from 'components/Loading';

class PageAddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      answer: '',
      tags: {},
      relatedQs: {},
      difficulty: 'easy',
      company: null,
    };
  }

  handleChange = (event) => {
    const target = event.target;

    if (target.type === 'checkbox') {
      let newTags;
      if (target.checked) {
        newTags = { ...this.state.tags, [target.name]: true };
      } else {
        newTags = { ...this.state.tags };
        delete newTags[target.name];
      }
      this.setState({ tags: newTags });
    }
    else {
      this.setState({ [target.name]: target.value });
    }
  };

  noCompany = () => {
    this.setState({ company: null });
  };

  // add or remove newly-clicked question to relatedQuestions
  addRelated = (event) => {
    const target = event.target;
    let newRelated;
    if (target.checked) {
      newRelated = { ...this.state.relatedQs, [target.name]: true };
    } else {
      newRelated = { ...this.state.relatedQs };
      delete newRelated[target.name];
    }
    this.setState({ relatedQs: newRelated });
  };

  createQuestion = () => {
    const updates = {};
    // only create an "answer" child object if answer in state
    const question =
      this.state.answer.trim() === ''
        ? {
            title: this.state.title,
            description: this.state.description,
            tags: this.state.tags,
            difficulty: this.state.difficulty,
            company: this.state.company
          }
        : {
            title: this.state.title,
            description: this.state.description,
            answer: this.state.answer,
            tags: this.state.tags,
            difficulty: this.state.difficulty,
            company: this.state.company
          };

    updates[`/questions/${this.props.questionCount}`] = question;
    updates[
      `/relatedQuestions/${this.props.questionCount}`
    ] = this.state.relatedQs;

    this.setState({
      title: '',
      description: '',
      answer: '',
      tags: {},
      difficulty: 'easy',
      relatedQs: {},
      company: null,
    });

    this.props.firebase.update('/', updates);
  };

  changeHot = (event) => {
    const target = event.target;
    const updates = {};
    updates[`/hotQuestions/${target.name}`] = target.checked ? true : null;
    this.props.firebase.update('/', updates);
  };

  render() {
    if (!isLoaded(this.props.questionCount)) {
      return <Loading />;
    }

    // redirect user if not logged in
    if (!this.props.uid) {
      return <Redirect to="/" />;
    }

    if (!isLoaded(this.props.admin)) {
      return <Loading />;
    }

    // redirect user if not admin
    if (!this.props.admin) {
      return <Redirect to="/" />;
    }

    // display checkboxes used to set the question's tags
    const checkboxes = tags.map((tag) => {
      return (
        <div key={tag}>
          <input
            type="checkbox"
            onChange={this.handleChange}
            name={tag}
            checked={this.state.tags[tag] || false}
          />
          {tag}
        </div>
      );
    });

    const companyBoxes = companies.map((company) => {
      return (
        <div key={company}>
          <label>
            <input
              type="radio"
              name="company"
              value={company}
              checked={this.state.company === company}
              onChange={this.handleChange}
            />
            {company}
          </label>
        </div>
      );
    });

    // display checkboxes used to set the question's related questions
    const related =
      this.props.questions &&
      Object.keys(this.props.questions).map((questId) => {
        return (
          <div key={questId}>
            <input
              type="checkbox"
              onChange={this.addRelated}
              name={questId}
              checked={this.state.relatedQs[questId] || false}
            />
            {questId}
          </div>
        );
      });
    
    const hotCheckboxes =
      this.props.questions &&
      isLoaded(this.props.hotQuestions) &&
      Object.keys(this.props.questions).map((questId) => {
        return (
          <div key={questId}>
            <input
              type="checkbox"
              onChange={this.changeHot}
              name={questId}
              checked=
                {(this.props.hotQuestions && this.props.hotQuestions[questId]) || false}
            />
            {questId}
          </div>
        );
      });

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <h2>Add a question</h2>
          <textarea
            name="title"
            placeholder="Question title..."
            onChange={this.handleChange}
            value={this.state.title}
          />
          <br />
          <textarea
            name="description"
            placeholder="Question description..."
            onChange={this.handleChange}
            value={this.state.description}
          />
          <br />
          <textarea
            name="answer"
            placeholder="Question answer (if applicable)..."
            onChange={this.handleChange}
            value={this.state.answer}
          />
          <br />
          Difficulty:
          <select
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />
          Tags:
          <br />
          {checkboxes}
          <br />
          Related Questions:
          <br />
          {related}
          Company:
          <br />
          {companyBoxes}
          <button onClick={this.noCompany}>
            No company
          </button>
          <button
            disabled={
              this.state.description.trim() === "" ||
              this.state.title.trim() === ""
            }
            onClick={this.createQuestion}
          >
            Submit
          </button>
        </div>
        <div>
          <h2>Hot Questions</h2>
          {hotCheckboxes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const questions = props.questions;
  const hotQuestions = state.firebase.data.hotQuestions;
  // get the count of the new question
  const questionCount =
    questions &&
    parseInt(Object.keys(questions)[Object.keys(questions).length - 1]) + 1;
  return {
    admin: state.firebase.profile.admin,
    questionCount,
    hotQuestions
  };
};

export default compose(
  firebaseConnect({ path: '/hotQuestions' }),
  connect(mapStateToProps)
)(PageAddQuestion);
