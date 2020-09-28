import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageProfile extends React.Component {

    render() {

      if(!isLoaded(this.props.email) || !isLoaded(this.props.tpHistory)) {
        return <div>Loading...</div>;
      }

    	if(!this.props.uid){
      		return <Redirect to="/register" />
    	}


    	const history = this.props.tpHistory &&
    	Object.keys(this.props.tpHistory).map( (tpId, index) => {
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
	const users = state.firebase.data.users;
	const user = users && users[uid];
	const tpHistory = user && user.tpHistory;

	const tps = state.firebase.data.tps;
	//console.log(tps);
	const email = user && user.email;
	return { tpHistory, email, uid, tps}
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    return [ {path: '/users'} ];
  }),
  connect(mapStateToProps)
)(PageProfile);
