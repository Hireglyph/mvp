import React from 'react';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageLanding.css';

const tags = ['geometry', 'algebra', 'divisibility']

class PageLanding extends React.Component {
    constructor(props){
      super(props);
      this.state = {titles: '', loaded: false};
    }

    componentDidMount() {
      if (!this.state.loaded) {
        const results = this.props.firebase.database().ref('questions').on('value', data => {
          if (data.val()) {
            this.setState({questions: data.val(), loaded: true});
          }
       });
      }
    }

    handleDiffFilter = difficulty => {
      this.setState({ difficulty, tag: '' });
    };

    handleTagFilter = tag => {
      this.setState({ tag, difficulty: '' })
    };

    render() {
      if (!this.state.loaded) {
        return (<div >Loading...</div>);
      }

      const easy = (
        <div>
          <div className='level1'></div>
          <div className='level2n'></div>
          <div className='level3n'></div>
        </div>
      );
      const medium = (
        <div>
          <div className='level1'></div>
          <div className='level2y'></div>
          <div className='level3n'></div>
        </div>
      );
      const hard = (
        <div>
          <div className='level1'></div>
          <div className='level2y'></div>
          <div className='level3y'></div>
        </div>
      );

      const quests =
        Object.keys(this.state.questions)
          .filter(questId => !this.state.difficulty || this.state.questions[questId].difficulty == this.state.difficulty)
          .filter(questId => !this.state.tag || this.state.questions[questId].tags[this.state.tag])
          .map(questId => {
            const quest = this.state.questions[questId];

            const topics = quest.tags &&
              Object.keys(quest.tags).map(tag => {
                return (
                  <span className='topic' key={tag}>{tag} </span>
                );
            });

            let bars;
            if (quest.difficulty && quest.difficulty === 'easy') {
              bars = easy;
            }
            if (quest.difficulty && quest.difficulty === 'medium') {
              bars = medium;
            }
            if (quest.difficulty && quest.difficulty === 'hard') {
              bars = hard;
            }

            return (
              <div className='question' key={questId}>
                <div><Link className='question-title' to={`/q/${questId}`}>#{questId}: {quest.title}</Link></div>
                <br />
                <div className='topics'>&nbsp;&nbsp;{topics}</div>
                <div>{bars}</div>
                <div ></div>
                <br />
              </div>
            );
          });

      const tagButtons = tags.map(tag => {
        return (
          <button onClick={() => this.handleTagFilter(tag)}>Filter by {tag}</button>
        )
      });

      return (
        <div className='background'>
          <div className='infobox'>
              <div className='intro'>Welcome to Hireglyph!</div>
              <div className='info'>Hireglyph is the future of collaborative interview preparation. Using Hireglyph, you can view other users’ thought processes (TPs) so that you can understand the correct logic behind solving complicated interview problems. Additionally, you can receive feedback on your own TPs from college students and financial professionals alike.</div>
              <div className='info-email'>Questions, comments, or concerns? Email us at <a className='email-link' href = "mailto: admin@hireglyph.com">admin@hireglyph.com</a>.</div>
              <br />
          </div>
          <br />
          <br />
          <div className='questions'>
          <h1 className='header'>Quantitative Analysis Questions</h1>
          <button onClick={() => this.handleDiffFilter('')}>Original list</button>
          <button onClick={() => this.handleDiffFilter('easy')}>Filter by easy</button>
          <button onClick={() => this.handleDiffFilter('medium')}>Filter by medium</button>
          <button onClick={() => this.handleDiffFilter('hard')}>Filter by hard</button>
          <br />
          <div>{tagButtons}</div>
          <div>{quests}</div>

          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    email: state.firebase.auth.email,
    uid: state.firebase.auth.uid,
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageLanding);
