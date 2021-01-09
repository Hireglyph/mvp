import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import '../styles/NavBar.css';

class NavBar extends React.Component{
    constructor(props){
        super(props);
    };

    handleClick = link => () => this.props.history.push(link);

    render() {
      if (!this.props.uid) {
          return (
              <div className='navbar'>
                  <div className='title'> <button className='title-text' onClick={this.handleClick('/')}>Hireglyph</button> </div>
                  <div className='link-click'> <button className='link-text' onClick={this.handleClick('/register')}>Register</button> </div>
                  <div className='button-click'> <button className='button-text' onClick={this.handleClick('/login')}>Login</button> </div>
              </div>
          );
      }

      return (
          <div className='navbar'>
              <div className='title'> <button className='title-text' onClick={this.handleClick('/')}>Hireglyph</button> </div>
              <div className='link-click2'> <button className={this.props.hasNotifs ? 'link-text2' : 'link-text'} onClick={this.handleClick('/notifications')}>Notifications</button> </div>
              <div className='link-click'> <button className='link-text' onClick={this.handleClick('/profile/tp')}>Profile</button> </div>
              <div className='button-click'><button className='button-text' onClick={() => {this.props.firebase.logout();window.location.href="/"}} >Logout</button> </div>
          </div>
      );
    }
}
const mapStateToProps = state => {
  return {
    hasNotifs: state.firebase.data.hasNotifs,
  };
}

export default compose(
  withRouter,
  firebaseConnect(props => [
    {
      path: '/hasNotifs/' + props.uid,
      storeAs: 'hasNotifs'
    },
  ]),
  connect(mapStateToProps)
)(NavBar);
