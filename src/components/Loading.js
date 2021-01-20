import React from 'react';
import ReactLoading from 'react-loading';

const Loading = function() {
  return (<ReactLoading className="loading" type={"bars"} width={200}/>);
}

export default Loading;