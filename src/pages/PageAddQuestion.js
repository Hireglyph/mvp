import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { tags } from '../constants/Tags';
import Loading from '../components/Loading.js';

class PageAddQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      answer: '',
      tags: {},
      relatedQs: {},
      difficulty: 'easy',
    };
  }

  handleChange = event => {
    const target = event.target;

    if (target.type == 'checkbox') {
      let newTags;
      if (target.checked) {
        newTags = { ...this.state.tags, [target.name]: true };
      }
      else {
        newTags = {...this.state.tags};
        delete newTags[target.name];
      }
      this.setState({ tags: newTags });
    }
    else {
      this.setState({ [target.name]: target.value });
    }
  }

  addRelated = event => {
    const target = event.target;
    let newRelated;
    if (target.checked) {
      newRelated = { ...this.state.relatedQs, [target.name]: true };
    }
    else {
      newRelated = {...this.state.relatedQs};
      delete newRelated[target.name];
    }
    this.setState({ relatedQs: newRelated });
  }

  createQuestion = () => {
    const updates = {};
    const question = this.state.answer.trim()==='' ? 
    {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      difficulty: this.state.difficulty,
    }
    :
    {
      title: this.state.title,
      description: this.state.description,
      answer: this.state.answer,
      tags: this.state.tags,
      difficulty: this.state.difficulty,
    }
    ;

    updates[`/questions/${this.props.questionCount}`] = question;
    updates[`/relatedQuestions/${this.props.questionCount}`] = this.state.relatedQs;

    this.setState({ title: '', description: '', answer: '', tags: {}, difficulty: 'easy', relatedQs: {} });

    this.props.firebase.update('/', updates);
  }

  render() {
    if (!isLoaded(this.props.questionCount)) {
      return <Loading />;
    }

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    if (!isLoaded(this.props.admin)) {
      return <Loading />;
    }

    if (!this.props.admin) {
      return <Redirect to="/" />;
    }

    const checkboxes = tags.map(tag => {
      return (
        <div key={tag}>
          <input
          type = "checkbox"
          onChange = {this.handleChange}
          name={tag}
          checked={this.state.tags[tag] || false}
          />
          {tag}
        </div>
      )
    });

    const related = this.props.questions && 
    Object.keys(this.props.questions).map(questId => {
      return (
        <div key={questId}>
          <input
          type = "checkbox"
          onChange = {this.addRelated}
          name={questId}
          checked={this.state.relatedQs[questId] || false}
          />
          {questId}
        </div>
      )
    });

    return (
      <div>
        <textarea
        name = "title"
        placeholder="Question title..."
        onChange = {this.handleChange}
        value={this.state.title}
        />
        <br/>
        <textarea
        name = "description"
        placeholder="Question description..."
        onChange = {this.handleChange}
        value={this.state.description}
        />
        <br/>
        <textarea
        name = "answer"
        placeholder="Question answer (if applicable)..."
        onChange = {this.handleChange}
        value={this.state.answer}
        />
        <br/>
        Difficulty:
        <select name="difficulty" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br/>
        Tags:
        <br/>
        {checkboxes}
        <br />
        Related Questions: 
        <br />
        {related}
        <button
        disabled={this.state.description.trim()===''||this.state.title.trim()===''}
        onClick={this.createQuestion}
        >
        Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const questions = state.firebase.data.questions;
  const questionCount = questions && 
    (parseInt(Object.keys(questions)[Object.keys(questions).length - 1]) + 1);
  return {
    isLoggedIn: state.firebase.auth.uid,
    admin: state.firebase.profile.admin,
    questions,
    questionCount,
  };
}

export default compose(
  firebaseConnect([ {path: '/questions'} ]),
  connect(mapStateToProps)
)(PageAddQuestion);
