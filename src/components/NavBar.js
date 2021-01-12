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
                  <div className='title'> <Link className='title-text' to='/'>Hireglyph</Link> </div>
                  <div className='link-click'> <Link className='link-text' to='/register'>Register</Link> </div>
                  <div className='button-click'> <button className='button-text' onClick={this.handleClick('/login')}>Login</button> </div>
              </div>
          );
      }

      return (
          <div className='navbar'>
              <div className='title'> <Link className='title-text' to='/'>Hireglyph</Link> </div>
              <div className='link-click2'> <Link className={this.props.hasNotifs ? 'link-text2' : 'link-text'} to='/notifications'>Notifications</Link> </div>
              <div className='link-click'> <Link className='link-text' to='/profile/tp'>Profile</Link> </div>
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
