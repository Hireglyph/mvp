import React, { Component } from 'react';
import Latex from 'react-latex';

import { length } from '../constants/PrevLength';

export default class TpPreview extends Component {
  constructor(props) {
  	super(props);
  }
  
  render() {
  	const { initial, approach, solution, expanded } = this.props;
	  return(
	  	<div>
	  		<link
	      href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
	      rel="stylesheet"
	      />
	      <div>
					<span className='tp-preview-head' >{initial ? 'Initial:' : ''}</span>
					<span className='tp-preview-tail'> 
						{expanded ? <Latex>{initial}</Latex> : initial && <Latex>{initial.slice(0,length+1) + (initial.length > length ? '...' : '')}</Latex>}
	      	</span>
				</div>
	      <div>
					<span className='tp-preview-head' >{approach ? 'Approaches:' : ''}</span>
					<span className='tp-preview-tail'>  
						{expanded ? <Latex>{approach}</Latex> : approach && <Latex>{approach.slice(0,length+1) + (approach.length > length ? '...' : '')}</Latex>}
	      	</span>
				</div>
				<div>
					<span className='tp-preview-head' >{solution ? 'Solution:' : ''}</span>
					<span className='tp-preview-tail'> 
						{expanded ? <Latex>{solution}</Latex> : solution && <Latex>{solution.slice(0,length+1) + (solution.length > length ? '...' : '')}</Latex>}
	      	</span>
				</div>
	    </div>
	  );
  }
}
