import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Latex from 'react-latex';

import TpPreview from '../components/TpPreview.js';
import PageOnboard from './PageOnboard';
import PageConfirmEmail from './PageConfirmEmail';
import { length } from '../constants/PrevLength';

import '../styles/PageProfile.css';

class PageProfile extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: true,
        tpExpand: {},
        feedbackExpand: {},
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.loading && isLoaded(this.props.tpHistory) && isLoaded(this.props.feedbackHistory)) {
        if(this.props.tpHistory) {
          let tpList = {};
          Object.keys(this.props.tpHistory).forEach(tpId => tpList[tpId] = false);
          this.setState({ tpExpand: tpList });
        }
        if(this.props.feedbackHistory) {
          let feedbackList = {};
          Object.keys(this.props.feedbackHistory).forEach(feedbackId => feedbackList[feedbackId] = false);
          this.setState({ feedbackExpand: feedbackList });
        }
        this.setState({ loading: false });
      }
    }

    generateTpMessage = (isExpanded, tpId) => {
      if (!isExpanded) {
        return <div onClick={() => this.changeTpExpand(true, tpId)}>Expand TP</div>
      }
      return <div onClick={() => this.changeTpExpand(false, tpId)}>Collapse TP</div>
    }

    generateFeedbackMessage = (isExpanded, feedbackId) => {
      if (!isExpanded) {
        return <div onClick={() => this.changeFeedbackExpand(true, feedbackId)}>Expand Feedback</div>
      }
      return <div onClick={() => this.changeFeedbackExpand(false, feedbackId)}>Collapse Feedback</div>
    }

    changeTpExpand = (value, tpId) => {
      this.setState({ tpExpand: { ...this.state.tpExpand, [tpId]: value }});
    }

    changeFeedbackExpand = (value, feedbackId) => {
      this.setState({ feedbackExpand: { ...this.state.feedbackExpand, [feedbackId]: value }});
    }

    handleTps = historyParam => {
      this.props.history.push(`/profile/${historyParam}`);
    }

    render() {
      if (!isLoaded(this.props.profile)) {
        return <div>Loading...</div>;
      }

      if (!this.props.uid) {
        return <Redirect to="/register" />;
      }

    	if (!this.props.onboarded) {
      	return <PageOnboard />
    	}

      if (!this.props.emailVerified) {
        return <PageConfirmEmail />;
      }

      if (this.props.historyParam != 'tp' && this.props.historyParam != 'feedback') {
        return <Redirect to={`/profile/tp`}/>;
      }

      const tps = this.props.tpHistory &&
      Object.keys(this.props.tpHistory).slice(0).reverse().map(tpId => {
        const tp = this.props.tpHistory[tpId];
        if (tp) {
          return (
            <div className='individual-tp-preview' key={tpId}>
              <div className='main-tp-text'>
                <div className='tp-preview-username'>Response to Question #{tp.questId}</div>
                <TpPreview initial={tp.initial} approach={tp.approach} solution={tp.solution} expanded={this.state.tpExpand[tpId]} />
                <div><span className='tp-preview-head' >Score:</span><span className='tp-preview-tail'>{typeof tp.total === 'undefined' ? "NA" : tp.total}</span></div>
                <div className='align-right'>
                  {((tp.initial && tp.initial.length > length) 
                    || (tp.approach && tp.approach.length > length) 
                    || (tp.solution && tp.solution.length > length)) ? this.generateTpMessage(this.state.tpExpand[tpId], tpId) : ''}
                  <Link className='tp-full-goto' to={`/tp/${tp.questId}/${tpId}`}>
                    Go to full TP
                  </Link>
                </div>
              </div>
              <br />
            </div>
          );
        }
        return;
      });

    const feedbacks = this.props.feedbackHistory &&
      Object.keys(this.props.feedbackHistory).slice(0).reverse().map(feedbackId => {
        const feedback = this.props.feedbackHistory[feedbackId].feedback;
        const questId = this.props.feedbackHistory[feedbackId].questId;
        const username = this.props.feedbackHistory[feedbackId].username;
        const tpId = this.props.feedbackHistory[feedbackId].tpId;
        const score = (typeof this.props.feedbackHistory[feedbackId].score === 'undefined') ? "NA" : this.props.feedbackHistory[feedbackId].score;
        if (feedback && username && questId && tpId) {
          return (
              <div className='individual-tp-preview' key={feedbackId}>
                <link
                href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
                rel="stylesheet"
                />
                <div className='main-tp-text'>
                  <div className='tp-preview-username'>Feedback to @{username}'s TP to Question #{questId}</div>
                  <div>
                    <span className='tp-preview-head'>Feedback:</span>
                    <span className='tp-preview-tail'>
                      <Latex>{this.state.feedbackExpand[feedbackId] ? feedback : feedback.slice(0,length+1) + '...'}</Latex>
                    </span>
                  </div>
                  <div><span className='tp-preview-head' >Score:</span><span className='tp-preview-tail'>  {score}</span></div>
                  <div className='align-right'>
                    {feedback.length > length ? this.generateFeedbackMessage(this.state.feedbackExpand[feedbackId], feedbackId) : ''}
                    <Link className='tp-full-goto' to={`/tp/${questId}/${tpId}#${feedbackId}`}>
                      Go to Feedback
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            );
        }
        return;
    });

    const display = (this.props.historyParam == "tp") ? tps : feedbacks ;

  	const history = this.props.tpHistory &&
  	Object.keys(this.props.tpHistory).slice(0).reverse().map((tpId, index) => {
  		return(
  			(tpId!=="test" && this.props.tpHistory[tpId].questId && this.props.tpHistory[tpId]) ?
    			<div className='tp-box' key={index}>
            <Link className='goto-text' to={`/tp/${this.props.tpHistory[tpId].questId}/${tpId}`}>Go to your TP for Question #{this.props.tpHistory[tpId].questId}</Link>

    			</div>
    			:
    			<div key={index}></div>
  		);
  	});

    return (
      <div className='background2'>
        <div className='intro2'>Your profile, @{this.props.username} </div>
        <div>
          <button
            disabled={this.props.historyParam === "tp"}
            onClick={() => this.handleTps("tp")}
          >
              My TP History
          </button>
          <button
            disabled={this.props.historyParam === "feedback"}
            onClick={() => this.handleTps("feedback")}
          >
              My Feedback History
          </button>
        </div>
    		<br />
    		{display}
	   </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const profile = state.firebase.profile;
  const username = profile && profile.username;
	const email = profile && profile.email;
  const onboarded = profile && profile.onboarded;
  const tpHistory = state.firebase.data.tpHistory;
  const feedbackHistory = state.firebase.data.feedbackHistory;
  const user = props.firebase.auth().currentUser;
  const emailVerified = user && user.emailVerified;
  const historyParam = props.match.params.historyParam;

	return { email, profile, onboarded, username, tpHistory, feedbackHistory, emailVerified, historyParam }
};

export default compose(
  withRouter,
  firebaseConnect(props => [
    {
      path: '/tpHistory/' + props.uid,
      storeAs: 'tpHistory'
    },
    {
      path: '/feedbackHistory/' + props.uid,
      storeAs: 'feedbackHistory'
    }
  ]),
  connect(mapStateToProps)
)(PageProfile);
