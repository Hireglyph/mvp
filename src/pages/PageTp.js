import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageTp extends React.Component{
	render(){

		if (!isLoaded(this.props.initial)) {
      return (<div>Loading...</div>);
    }

    if(!this.props.isLoggedIn){
      return <Redirect to="/register" />
    }

		return(
			<div>
				<p>Initial thoughts: {this.props.initial}</p>
				<p>Approaches tried: {this.props.approach}</p>
				<p>Final solution: {this.props.solution}</p>
        <Link to={`/q/${this.props.questId}`}>Back to Question "{this.props.questId}"</Link>
        <br />
        <Link to="/">Home</Link>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId;
  const tpId = props.match.params.tpId;
  const tp = state.firebase.data[tpId];

  const initial = tp && tp.initial;
  const approach = tp && tp.approach;
  const solution = tp && tp.solution;

  return { questId, tpId, initial, approach, solution, isLoggedIn: state.firebase.auth.uid, questId};
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    const tpId = props.match.params.tpId;

    return [ //{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}/${tpId}`, storeAs: tpId }];
  }),
  connect(mapStateToProps)
)(PageTp);
