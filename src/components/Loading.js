import React from 'react';
import ReactLoading from 'react-loading';

var Loading = function() {
  return (<ReactLoading className="loading" type={"bars"} width={200}/>);
}

export default Loading;