import React from 'react';
import { Component } from 'react';

import { HashLink as Link } from 'react-router-hash-link';
import '../styles/PageQuestion.css'

export default class TpPreview extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const tp = this.props.tp;
    const tpId = this.props.tpId;
    const questId = this.props.questId;
    const total = (typeof tp.total === 'undefined') ? "NA" : tp.total;
    if(tp.initial && tp.approach){
      return (
        <div className='individual-tp-preview' key={tpId}> 
          <div className='main-tp-text'>
            <div className='tp-preview-username'>Response to Question #{questId}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initial:</span><span className='tp-preview-tail'> {tp.initial}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Approaches:</span><span className='tp-preview-tail'>  {tp.approach}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Score:</span><span className='tp-preview-tail'>  {total}</span></div>
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
    return (
        <div className='individual-tp-preview' key={tpId}> 
          <div className='main-tp-text'>
            <div className='tp-preview-username'>Response to Question #{questId}</div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solution:</span><span className='tp-preview-tail'> {tp.solution}</span></div>
            <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;Score:</span><span className='tp-preview-tail'>  {total}</span></div>
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