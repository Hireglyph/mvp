import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Latex from 'react-latex';

export default class TpPreview extends Component {
  constructor(props){
  	super(props);
  }
  
  render() {
  	const initial = this.props.initial;
  	const approach = this.props.approach;
  	const solution = this.props.solution;
  	const expanded = this.props.expanded;
	  return(
	  	<div>
	  		<link
	      href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
	      rel="stylesheet"
	      />
	      <div><span className='tp-preview-head' >{initial ? 'Initial:' : ''}</span><span className='tp-preview-tail'> {expanded ? 
	        <Latex>{initial}</Latex> : initial && <Latex>{initial.slice(0,45) + (initial.length > 44 ? '...' : '')}</Latex>}
	      </span></div>
	      <div><span className='tp-preview-head' >{approach ? 'Approaches:' : ''}</span><span className='tp-preview-tail'>  {expanded ? 
	        <Latex>{approach}</Latex> : approach && <Latex>{approach.slice(0,45) + (approach.length > 44 ? '...' : '')}</Latex>}
	      </span></div>
	      <div><span className='tp-preview-head' >{solution ? 'Solution:' : ''}</span><span className='tp-preview-tail'> {expanded ? 
	        <Latex>{solution}</Latex> : solution && <Latex>{solution.slice(0,45) + (solution.length > 44 ? '...' : '')}</Latex>}
	      </span></div>
	    </div>
	  );
  }
}
