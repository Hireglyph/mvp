import React from 'react';
import PreviewPractice from '../components/PreviewPractice.js';
import SaPreview from '../components/SaPreview.js';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageProfile.css';
import PageOnboard from './PageOnboard';


class PageProfile extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        setting: "tp",
      };
    }

    handleTps = number => {
      this.setState({ setting: number });
    }

    render() {

      if (!isLoaded(this.props.profile)) {
        return <div>Loading...</div>;
      }

    	if (isEmpty(this.props.profile)){
      		return <Redirect to="/register" />
    	}

      const tps = this.props.tpHistory &&
      Object.keys(this.props.tpHistory).slice(0).reverse().map(tpId => {
        const tp = this.props.tpHistory[tpId];
        if(tp){
          return (
              <PreviewPractice tp={tp} tpId={tpId} questId={this.props.tpHistory[tpId].questId} key={tpId}/>
            );
        }
        return;

    });

    const sas = this.props.saHistory &&
      Object.keys(this.props.saHistory).slice(0).reverse().map(saId => {
        const sa = this.props.saHistory[saId];
        if(sa){
          return (
              <SaPreview sa={sa} saId={saId} questId={this.props.saHistory[saId].questId} key={saId}/>
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
        const saId = this.props.feedbackHistory[feedbackId].saId;
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
        if (feedback && username && questId && saId) {
          return (
              <div className='individual-tp-preview'>
                <div className='main-tp-text'>
                  <div className='tp-preview-username'>Feedback to @{username}'s SA to Question #{questId}</div>
                  <div>
                    <span className='tp-preview-head'>
                      nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feedback:
                    </span>
                    <span className='tp-preview-tail'>{feedback.slice(0,45)}...</span>
                  </div>
                  <div className='align-right'>
                    <Link className='tp-full-goto' to={`/sa/${questId}/${saId}#${feedbackId}`}>
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

    const display = (this.state.setting == "tp") ? tps : ( (this.state.setting == "sa") ? sas : feedbacks ) ;

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
            disabled={this.state.setting === "tp"}
            onClick={() => this.handleTps("tp")}
          >
              My TP History
          </button>
          <button
            disabled={this.state.setting === "sa"}
            onClick={() => this.handleTps("sa")}
          >
              My SA History
          </button>
          <button
            disabled={this.state.setting === "feedback"}
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

const mapStateToProps = (state, _props) => {
  const profile = state.firebase.profile;
  const username = profile && profile.username;
	const email = profile && profile.email;
  const onboarded = profile && profile.onboarded;
  const tpHistory = state.firebase.data.tpHistory;
  const saHistory = state.firebase.data.saHistory;
  const feedbackHistory = state.firebase.data.feedbackHistory;

	return { email, profile, onboarded, username, tpHistory, saHistory, feedbackHistory }
};

export default compose(
  withRouter,
  firebaseConnect(props => [
    {
      path: '/tpHistory/' + props.uid,
      storeAs: 'tpHistory'
    },
    {
      path: '/saHistory/' + props.uid,
      storeAs: 'saHistory'
    },
    {
      path: '/feedbackHistory/' + props.uid,
      storeAs: 'feedbackHistory'
    }
  ]),
  connect(mapStateToProps)
)(PageProfile);
