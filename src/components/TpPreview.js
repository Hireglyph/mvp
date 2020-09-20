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
        <div>Initial thoughts: {tp.initial}</div>
        <div>Approaches tried: {tp.approach}</div>
        <div>Final solution: {tp.solution}</div>
        <div>Upvotes: {tp.votes}</div>
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
