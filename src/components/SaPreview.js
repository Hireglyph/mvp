import React from 'react';
import { Component } from 'react';

import { HashLink as Link } from 'react-router-hash-link';
import '../styles/PageQuestion.css'

export default class TpPreview extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const sa = this.props.sa;
    const saId = this.props.saId;
    const questId = this.props.questId;

    return (
      <div className='individual-tp-preview' key={saId}> 
        <div className='main-tp-text'>
          <div className='tp-preview-username'>Response to Question #{questId}</div>
          <div><span className='tp-preview-head' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Answer:</span><span className='tp-preview-tail'> {sa.answer.slice(0,45)}...</span></div>

          <div className='align-right'>
          <Link className='tp-full-goto' to={`/sa/${this.props.questId}/${saId}`}>
            Go to full SA
          </Link>
        </div>
        </div>
        <br />
      </div>
    );
  }
}