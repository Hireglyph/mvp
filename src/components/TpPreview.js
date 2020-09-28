import React from 'react';
import { Component } from 'react';

import { Link } from 'react-router-dom';

export default class TpPreview extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const tp = this.props.tp;
    const tpId = this.props.tpId;
    const questId = this.props.questId;

    return (
      <div key={tpId}> 
        <div>TP created by @{tp.creator.username}</div>
        <div>Initial thoughts: {tp.initial.slice(0,20)}...</div>
        <div>Approaches tried: {tp.approach.slice(0,20)}...</div>
        <div>Final solution: {tp.solution.slice(0,20)}...</div>
        <div>Score: {tp.total}</div>
        <div>
          <Link to={`/tp/${this.props.questId}/${tpId}`}>
            View full Thought Process
          </Link>
        </div>
        <br />
      </div>
    );
  }
}
