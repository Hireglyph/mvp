import React from 'react';
import PreviewPractice from '../components/PreviewPractice.js';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageProfile.css';


class PageProfile extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        setting: 1,
      };
    }

    handleTps = number => {
      this.setState({ setting: number });
    }

    render() {

      if(!isLoaded(this.props.profile)) {
        return <div>Loading...</div>;
      }

    	if(isEmpty(this.props.profile)){
      		return <Redirect to="/register" />
    	}

      const tps = this.props.tpHistory &&
      Object.keys(this.props.tpHistory).slice(0).reverse().map(tpId => {
        const tp = this.props.tpHistory[tpId].tp &&  this.props.tpHistory[tpId].tp;
        if(tp){
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
        if (feedback && username && questId && tpId) {
          return (
              <div className='individual-tp-preview'>
                <div className='main-tp-text'>
                  <div className='tp-preview-username'>Feedback to @{username}'s TP to Question #{questId}</div>
                  <div>
                    <span className='tp-preview-head'>
                      nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feedback:
                    </span>
                    <span className='tp-preview-tail'>{feedback.slice(0,45)}...</span>
                  </div>
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

    const display = (this.state.setting == 1) ? tps : feedbacks;

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
            disabled={this.state.setting === 1}
            onClick={() => this.handleTps(1)}
          >
              My TP History
          </button>
          <button
            disabled={this.state.setting === 2}
            onClick={() => this.handleTps(2)}
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
	const uid = state.firebase.auth.uid;
  const profile = state.firebase.profile;
  const username = profile && profile.username;
	const tpHistory = profile && profile.tpHistory;
  const feedbackHistory = profile && profile.feedbackHistory;
	const email = profile && profile.email;

	return { tpHistory, email, uid, profile, username, feedbackHistory }
};

export default compose(
  withRouter,
  firebaseConnect(),
  connect(mapStateToProps)
)(PageProfile);
