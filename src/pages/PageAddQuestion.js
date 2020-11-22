import React from 'react';

import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tags } from '../constants/Tags';

class PageAddQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      answer: '',
      tags: {},
    };
  }

  handleChange = event => {
    const target = event.target;

    if (target.type == 'checkbox') {
      const newTags = { ...this.state.tags, [target.name]: target.checked}
      this.setState({ tags: newTags })
    }
    else {
      this.setState({ [target.name]: target.value });
    }
  }

  createQuestion = () => {
    const updates = {};
    const question = {
      title: this.state.title,
      description: this.state.description,
      answer: this.state.answer,
      tags: this.state.tags,
    };

    updates[`/questions/${this.props.questionCount}`] = question;
    updates['/questionCount'] = this.props.questionCount + 1;

    this.setState({ title: '', description: '', answer: '' });

    this.props.firebase.update('/', updates);
  }

  render() {
    if (!isLoaded(this.props.admin) || !isLoaded(this.props.questionCount)) {
      return (<div>Loading...</div>);
    }

    if (!this.props.admin) {
      return <Redirect to="/" />;
    }

    const checkboxes = tags.map(tag => {
      return (
        <div>
          <input
          type = "checkbox"
          onChange = {this.handleChange}
          name={tag}
          />
          {tag}
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
        Tags:
        <br/>
        {checkboxes}
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
  return {
    email: state.firebase.auth.email,
    uid: state.firebase.auth.uid,
    admin: state.firebase.profile.admin,
    questionCount: state.firebase.data.questionCount,
  };
}

export default compose(
  firebaseConnect(['/questionCount']),
  connect(mapStateToProps)
)(PageAddQuestion);
