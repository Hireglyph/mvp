import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import '../styles/NavBar.css';

class NavBar extends React.Component{

    render() {
        if(!this.props.uid){
            return (
                <div className='navbar'>
                    <div className='title'> <a className='text' href="/">Hireglyph</a> </div>
                    <div className='text2'> <a className='text21' href="/register">Register</a> </div>
                    <div className='t4'> <button className='text31' onClick={() => window.location.href="/login"}>Login</button> </div>
                </div>
            );
        }
//<a href="/login">Login</a>
//<a href="/register">Register</a>
        return (
            <div className='navbar'>
                <div className='title'> <a className='text' href="/">Hireglyph</a> </div>
                <div className='text2'> <a className='text21' href="/profile">Profile</a> </div>
                <div className='t4'><button className='text31' onClick={() => {this.props.firebase.logout();window.location.href="/"}} >Logout</button> </div>
            </div>
            //   <a href="/profile">Profile</a>
                //<a onClick={() => this.props.firebase.logout()}>Logout</a>
        );
    }
}
const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
  };
}

export default compose(
  firebaseConnect(), connect(mapStateToProps)
)(NavBar);