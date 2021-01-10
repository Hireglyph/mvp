import React from 'react';
import PreviewPractice from '../components/PreviewPractice.js';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageProfile.css';
import PageOnboard from './PageOnboard';
import PageConfirmEmail from './PageConfirmEmail';

class PageProfile extends React.Component {
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
        this.props.history.push(`/profile/tp`);
      }

      const tps = this.props.tpHistory &&
      Object.keys(this.props.tpHistory).slice(0).reverse().map(tpId => {
        const tp = this.props.tpHistory[tpId];
        if (tp) {
          return (
              <PreviewPractice tp={tp} tpId={tpId} questId={this.props.tpHistory[tpId].questId} key={tpId}/>
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
                <div className='main-tp-text'>
                  <div className='tp-preview-username'>Feedback to @{username}'s TP to Question #{questId}</div>
                  <div>
                    <span className='tp-preview-head'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feedback:
                    </span>
                    <span className='tp-preview-tail'>{feedback}</span>
                  </div>
                  <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Score:</span><span className='tp-preview-tail'>  {score}</span></div>
                  <div className='align-right'>
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
