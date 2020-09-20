import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class PageThoughtProcess extends React.Component{
	render(){

		if (!isLoaded(this.props.initial)) {
      		return (<div>Loading...</div>);
    	}
		
		//console.log(this.props.initial);
		return(
			<div>
				<p>Initial thoughts: {this.props.initial}</p>
				<p>Approaches tried: {this.props.approach}</p>
				<p>Final solution: {this.props.solution}</p>
			</div>
		);	
	}


}

const mapStateToProps = (state, props) => {
  const questId = props.match.params.questId;
  const tpId = props.match.params.tpId;
  //console.log(tpId);
  //const question = state.firebase.data[questId];
  const tp = state.firebase.data[tpId];

  //console.log(tp);
  const initial = tp && tp.initial;
  const approach = tp && tp.approach;
  const solution = tp && tp.solution;


  return { questId, tpId, initial, approach, solution };
}

// COMMENT FOR LATER: don't get tp data if they don't get to see the tps??

export default compose(
  withRouter,
  firebaseConnect(props => {
    const questId = props.match.params.questId;
    const tpId = props.match.params.tpId;
    
    return [ //{path: `/questions/${questId}`, storeAs: questId},
            {path: `/tps/${questId}/${tpId}`, storeAs: tpId }];
  }),
  connect(mapStateToProps)
)(PageThoughtProcess);