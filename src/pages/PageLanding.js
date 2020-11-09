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

    componentDidUpdate(prevProps, prevState) {
      if(!this.state.loaded){
        const results = this.props.firebase.database().ref('questions').on('value', data => {
        if(data.val() !== null) {
          let obj = data.val();
          let titles = Object.keys(obj).map(key => {
            return {
              title: obj[key].title
            }
          });
          this.setState({titles, loaded: true});
         }
       });
      }
    }

    render() {
      if (!isLoaded(this.props.questions) || !this.state.loaded) {
        return (<div >Loading...</div>);
      }

      var db = this.props.firebase.database();
    var ref = db.ref("questions");
    ref.on("value", function(snapshot) {
      console.log(Object.keys(snapshot.val()));
      var bop = Object.keys(snapshot.val())}, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      })

      console.log(this.state.titles);
    

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
        Object.keys(this.props.questions).map(questId => {
          const quest = this.props.questions[questId];

          const topics = quest.topics &&
            Object.keys(quest.topics).map(topicId => {
              return (
                <span className='topic' key={topicId}>{quest.topics[topicId]} </span>
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
              <div> {this.state.titles[0].title}</div>
          </div>
          <br />
          <br />
          <div className='questions'>
            <h1 className='header'>Quantitative Analysis Questions</h1>
            <div>{quests}</div>
            
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    questions: state.firebase.data.questions,
    email: state.firebase.auth.email,
    uid: state.firebase.auth.uid,
  };
}

export default compose(
  firebaseConnect(['/questions']),
  connect(mapStateToProps)
)(PageLanding);
