import React from 'react';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageLanding.css';

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

    handleChange = diff => {
      this.setState({sortBy: diff});
    }

    render() {
      if (!this.state.loaded) {
        console.log(this.state)
        return (<div >Loading...</div>);
      }

      // var db = this.props.firebase.database();
      // var ref = db.ref("questions");
      // ref.on("value", function(snapshot) {
      //   console.log(Object.keys(snapshot.val()));
      //   var bop = Object.keys(snapshot.val())}, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });

      console.log(this.state.questions);


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
          .filter(questId => !this.state.sortBy || this.state.questions[questId].difficulty == this.state.sortBy)
          .map(questId => {
            const quest = this.state.questions[questId];

            const topics = quest.tags &&
              Object.keys(quest.tags).map(tag => {
                return (
                  <span className='topic' key={tag}>{tag} </span>
                );
            });

            let bars;
            if(quest.difficulty && quest.difficulty === 'easy'){
              bars = easy;
            }
            if(quest.difficulty && quest.difficulty === 'medium'){
              bars = medium;
            }
            if(quest.difficulty && quest.difficulty === 'hard'){
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
        //<div>&nbsp;&nbsp;Difficulty: {quest.difficulty}</div>
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
          <button onClick={() => this.handleChange('')}>Original list</button>
          <button onClick={() => this.handleChange('easy')}>Filter by easy</button>
          <button onClick={() => this.handleChange('medium')}>Filter by medium</button>
          <button onClick={() => this.handleChange('hard')}>Filter by hard</button>
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
