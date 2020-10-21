import React from 'react';
import { Component } from 'react';

import { Link } from 'react-router-dom';
import '../styles/PageQuestion.css'

export default class TpPreview extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const tp = this.props.tp;
    const tpId = this.props.tpId;
    const questId = this.props.questId;

    return (
      <div className='individual-tp-preview' key={tpId}> 
        <div className='main-tp-text'>
          <div className='tp-preview-username'>Response to Question #{questId}</div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initial:</span><span className='tp-preview-tail'> {tp.initial.slice(0,45)}...</span></div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Approaches:</span><span className='tp-preview-tail'>  {tp.approach.slice(0,45)}...</span></div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution.slice(0,45)}...</span></div>

          <div className='align-right'>
          <Link className='tp-full-goto' to={`/tp/${this.props.questId}/${tpId}`}>
            Go to full TP
          </Link>
        </div>
        </div>
        <br />
      </div>
    );
  }
}