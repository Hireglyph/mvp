import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageProfile.css';


class PageProfile extends React.Component {

    render() {

      if(!isLoaded(this.props.profile)) {
        return <div>Loading...</div>;
      }

    	if(isEmpty(this.props.profile)){
      		return <Redirect to="/register" />
    	}


    	const history = this.props.tpHistory &&
    	Object.keys(this.props.tpHistory).slice(0).reverse().map( (tpId, index) => {
    		return(
    			(tpId!=="test" && this.props.tpHistory[tpId].questId && this.props.tpHistory[tpId]) ?
	    			<div className='tp-box' key={index}>
              <Link className='goto-text' to={`/tp/${this.props.tpHistory[tpId].questId}/${tpId}`}>Go to your TP for Question #{this.props.tpHistory[tpId].questId}</Link>
	    				
	    			</div>
	    			:
	    			<div key={index}></div>
    		);
    	})

        return (<div className='background2'>
            <div className='intro2'>Your profile, @{this.props.username} </div>
        		<br />
        		{history}
   	     		</div>);
    }
}

const mapStateToProps = (state, props) => {
	const uid = state.firebase.auth.uid;
  const profile = state.firebase.profile;
  const username = profile && profile.username;
	const tpHistory = profile && profile.tpHistory;

	const email = profile && profile.email;
	return { tpHistory, email, uid, profile, username }
};

export default compose(
  withRouter,
  firebaseConnect(),
  connect(mapStateToProps)
)(PageProfile);
