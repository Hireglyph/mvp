import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
	    			<div key={index}>
	    				<h4>Go to your thought process to question "{this.props.tpHistory[tpId].questId}"</h4>
              <Link to={`/tp/${this.props.tpHistory[tpId].questId}/${tpId}`}>Click HERE</Link>
	    				<hr />
	    			</div>
	    			:
	    			<div key={index}></div>
    		);
    	})

        return (<div>User profile!
        		<br />
        		<br />
        		{this.props.email}
        		{history}
              	<Link to="/">Home</Link>
   	     		</div>);
    }
}

const mapStateToProps = (state, props) => {
	const uid = state.firebase.auth.uid;
  const profile = state.firebase.profile;
	const tpHistory = profile && profile.tpHistory;

	const email = profile && profile.email;
	return { tpHistory, email, uid, profile }
};

export default compose(
  withRouter,
  firebaseConnect(),
  connect(mapStateToProps)
)(PageProfile);
