import React from 'react';
import TpPreview from '../components/TpPreview.js';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageQuestion.css'

class PageEasyQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isMySa: true,
      answer: '',
      loading: true,
      orderByTop: true,
      keys: [],
      time: [],
      expand: {}, 
      showAnswer: false,
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loading && isLoaded(this.props.sas)) {
      let keys = this.props.sas ? Object.keys(this.props.sas) : [];
      keys.sort((a, b) => this.props.sas[b].total - this.props.sas[a].total);
      this.setState({ loading: false, keys, });
      if (this.props.sas){
        let list = {};
        Object.keys(this.props.sas).map(saId => {
          list[saId] = false;
          return;
        });
        this.setState({ time: Object.keys(this.props.sas).reverse(), expand: list })
      }
    }
  }

  displaySa = saId => {
    const sa = this.props.sas[saId];
    const answer = this.props.sas[saId].answer;
    const username = this.props.sas[saId].username;
    const total = this.props.sas[saId].total;
    const expanded = this.state.expand[saId];
    if (expanded) {
      return (
        <div className='individual-tp-preview' key={saId}>
          <div className='main-tp-text'>
            <div className='tp-preview-username'>@{username}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Answer:</span><span className='tp-preview-tail'> {answer}</span></div>

            <div className='align-right'>
            <div onClick={() => this.changeExpand(saId, false)}>Collapse SA</div>
            <Link className='tp-full-goto' to={`/sa/${this.props.questId}/${saId}`}>
              Go to full SA
            </Link>
          </div>
          </div>
          <div className='main-tp-score'>{total}</div>
          <br />
        </div>
      );
    }
    return (
      <div className='individual-tp-preview' key={saId}>
        <div className='main-tp-text'>
          <div className='tp-preview-username'>@{username}</div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Answer:</span><span className='tp-preview-tail'> {answer.slice(0,45)}...</span></div>

          <div className='align-right'>
          <div onClick={() => this.changeExpand(saId, true)}>Expand SA</div>
          <Link className='tp-full-goto' to={`/sa/${this.props.questId}/${saId}`}>
            Go to full SA
          </Link>
        </div>
        </div>
        <div className='main-tp-score'>{total}</div>
        <br />
      </div>
    );
  }

  changeOrder = () => {
    this.setState({ orderByTop: !this.state.orderByTop });
  }

  changeShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  handleSas = () => {
    this.setState({ isMySa: !this.state.isMySa });
  }

  changeExpand = (saId, value) => {
    this.setState({ expand: Object.assign(this.state.expand, {[saId]: value}) })
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  createSa = () => {
    const questId = this.props.questId;
    const uid = this.props.isLoggedIn;

    const saId = this.props.firebase.push(`/sas/${questId}`).key;
    const updates = {};
    const sa = {
      answer: this.state.answer,
      creator: uid,
      username: this.props.username,
      total: 0
    };

    const sa2 = {
      answer: this.state.answer,
      questId: questId,
    };

    updates[`/sas/${questId}/${saId}`] = sa;
    updates[`/saHistory/${uid}/${saId}`] = sa2;
    updates[`/questionHistory/${uid}/${questId}`] = true;

    const onComplete = () => {
      this.props.history.push(`/sa/${questId}/${saId}`);
    }
    this.props.firebase.update('/', updates, onComplete);
  }

  render() {
    if (!isLoaded(this.props.title) || !isLoaded(this.props.sas)) {
      return (<div>Loading...</div>);
    }

    if (isEmpty(this.props.title)){
      return <div>Page not found!</div>;
    }

    if(this.props.difficulty && this.props.questId && this.props.difficulty !== 'easy'){
      return <Redirect to={`/q/${this.props.questId}`} />
    }

    const topics = this.props.tags &&
      Object.keys(this.props.tags).map(tag => {
        return (
          <span className='topic-2' key={tag}>{tag} </span>
        );
    });

    const answer = this.props.answer && 
      (<div>
        <div onClick={() => this.changeShowAnswer()}>Click to see answer</div>
        <div>{this.state.showAnswer ? this.props.answer : ""}</div>
      </div>);

    let bars;
    if (this.props.difficulty && this.props.difficulty === 'easy') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2n2'></div>
          <div className='level3n2'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'medium') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2y2'></div>
          <div className='level3n2'></div>
        </div>
      );
    }
    if (this.props.difficulty && this.props.difficulty === 'hard') {
      bars = (
        <div>
          <div className='level12'></div>
          <div className='level2y2'></div>
          <div className='level3y2'></div>
        </div>
      );
    }

    const Sas = this.props.sas &&
      this.state.keys.map(saId => {
        return(this.displaySa(saId));
    });

    const sasByTime = this.props.sas &&
      this.state.time.map(saId => {
        return(this.displaySa(saId));
    });

    const communitySas =
      <div>
        <button
          disabled={this.state.orderByTop}
          onClick={() => this.changeOrder()}
        >
          Top SAs
        </button>
        <button
          disabled={!this.state.orderByTop}
          onClick={() => this.changeOrder()}
        >
          New SAs
        </button>
        {this.state.orderByTop ? Sas : sasByTime}
      </div>

    const mySa = (
      <div className='my-tp-submit'>
        <p className='tp-instructions-text'>Enter your Short Answer below:</p>
        <textarea
        className='tp-input-box'
        name = "answer"
        placeholder="Enter your short answer here!"
        onChange = {this.handleChange}
        value={this.state.answer}
        />
        <br />
        <br />
        <button
        className='tp-submit-green'
        disabled=
        {this.state.answer.trim()===''}
        onClick={this.createSa}
        >
        Submit
        </button>
      </div>

      );

    let section;
    if (this.state.isMySa) {
      section = mySa;
    }
    if (!this.state.isMySa) {
      section = communitySas;
    }

    if (!this.props.isLoggedIn) {
      section = (
        <div className='login-message'>
          <p>You need to log in or register to view SAs or write your own.</p>
        </div>
      );
    }

    return(
      <div>
        <div className='question-block'>
          <div className='question-title-2'>
              <h1>#{this.props.questId}: {this.props.title}</h1>
          </div>
          <div className='question-description'>
            <p>{this.props.description}</p>
          </div>
          <div>{bars}</div>
          <div className='topics-2'>{topics}</div>
          <div>{answer}</div>
        </div>
        <div>
          <button
            className='my-tp-button-1'
            disabled={this.state.isMySa}
            onClick={() => this.handleSas()}
          >
              My SA
          </button>
          <button
            className='community-tp-button-1'
            disabled={!this.state.isMySa}
            onClick={() => this.handleSas()}
          >
              Community SAs
          </button>
          <hr className={this.state.isMySa ? 'divider-line' : 'divider-line-2'}/>
        </div>
        <div className={this.state.isMySa ? 'px-break' : 'px-break-2'}>
          {section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId
  const question = state.firebase.data[questId];

  const title = question && question.title;
  const description = question && question.description;
  const definitive = question && question.definitive;
  const topics = question && question.topics;
  const tags = question && question.tags;
  const difficulty = question && question.difficulty;
  const answer = question && question.answer;
  const sas = question && state.firebase.data.sas && state.firebase.data.sas[questId];
  const username = state.firebase.profile && state.firebase.profile.username;
  return { questId, title, description, definitive, topics, difficulty, answer, sas, username, isLoggedIn: state.firebase.auth.uid, tags};

}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    return [{path: `/questions/${questId}`, storeAs: questId},
            {path: `/sas/${questId}` } ];
  }),
  connect(mapStateToProps)
)(PageEasyQuestion);
