import React, { Component } from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (<ReactLoading className="loading" type={"bars"} width={200}/>);
    }
}
