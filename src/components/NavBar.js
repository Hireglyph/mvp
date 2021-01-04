import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import '../styles/NavBar.css';

class NavBar extends React.Component{
    constructor(props){
        super(props);
    };

    render() {
        if(!this.props.uid){
            return (
                <div className='navbar'>
                    <div className='title'> <a className='title-text' href="/">Hireglyph</a> </div>
                    <div className='link-click'> <a className='link-text' href="/register">Register</a> </div>
                    <div className='button-click'> <button className='button-text' onClick={() => window.location.href="/login"}>Login</button> </div>
                </div>
            );
        }
//<a href="/login">Login</a>
//<a href="/register">Register</a>
        return (
            <div className='navbar'>
                <div className='title'> <a className='title-text' href="/">Hireglyph</a> </div>
                <div className='link-click2'> <a className={this.props.hasNotifs ? 'link-text2' : 'link-text'} href="/notifications">Notifications</a> </div>
                <div className='link-click'> <a className='link-text' href="/profile/tp">Profile</a> </div>
                <div className='button-click'><button className='button-text' onClick={() => {this.props.firebase.logout();window.location.href="/"}} >Logout</button> </div>
            </div>
            //   <a href="/profile">Profile</a>
                //<a onClick={() => this.props.firebase.logout()}>Logout</a>
        );
    }
}
const mapStateToProps = state => {
  return {
    hasNotifs: state.firebase.data.hasNotifs,
  };
}

export default compose(
  firebaseConnect(props => [
    {
      path: '/hasNotifs/' + props.uid,
      storeAs: 'hasNotifs'
    },
  ]),
  connect(mapStateToProps)
)(NavBar);
