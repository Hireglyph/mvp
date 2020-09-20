import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageProfile extends React.Component {

    render() {

    	if(!this.props.uid){
      		return <Redirect to="/register" />
    	}

    	if(!isLoaded(this.props.email) || !isLoaded(this.props.tpHistory)) {
    		return <div>Loading...</div>;
    	}

    	const history = this.props.expanded && this.props.tpHistory && 
    	Object.keys(this.props.tpHistory).map( (questId, index) => {
    		return(
    			(questId!=="test") ? 
	    			<div key={index}>
	    				<h4>This is your thought process to question "{questId}"</h4>
	    				<p>{this.props.tpHistory[questId].initial}</p>
	    				<p>{this.props.tpHistory[questId].approach}</p>
	    				<p>{this.props.tpHistory[questId].solution}</p>
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

	const expanded = tpHistory && tps && Object.keys(tpHistory).map(questId => {
		if(tpHistory[questId].tpId){
			tpHistory[questId] = tps[questId][tpHistory[questId].tpId];
		}
	});
	const email = user && user.email;
	return { tpHistory, email, uid, tps, expanded}
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    return [ {path: '/users'} , {path: '/tps'} ];
  }),
  connect(mapStateToProps)
)(PageProfile);
