/** @jsx jsx */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { jsx } from 'theme-ui';

const NavBarSx = {
  backgroundColor: 'orange',
  width: '100%',
  height: '62px',
  paddingTop: '0.8em',
  paddingLeft: '2em',
  paddingRight: '2em',
  fontFamily: 'Open-Sans',
  display: 'flex',

  '.title': {
    fontSize: '30px',
    color: 'text',
    textDecoration: 'none',
  },

  '.link, .login-button': {
    fontSize: '20px',
    color: 'text',
    textDecoration: 'none',
  },

  '.has-notifs': {
    color: 'red',
  },

  '.nav-elements': {
    display: 'flex',
    marginTop: '10px',
    marginLeft: 'auto',
    gap: '40px',
  },

};

class NavBar extends React.Component{
    constructor(props){
      super(props);
    };

    handleClick = link => () => this.props.history.push(link);

    render() {
      if (!this.props.uid) {
        return (
          <div className='navbar' sx={NavBarSx}>
            <div className='title-container'>
              <Link to='/' className='title'>Hireglyph</Link>
            </div>
            <div className='nav-elements'>
              <div>
                <Link to='/register' className='link'>Register</Link>
              </div>
              <div>
                <button
                  className='login-button'
                  onClick={this.handleClick('/login')}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className='navbar' sx={NavBarSx}>
          <div className='title-container'>
            <Link className='title' to='/'>Hireglyph</Link>
          </div>
          <div className='nav-elements'>
            <div>
              <Link
                className={this.props.hasNotifs ? 'has-notifs link' : 'link'}
                to='/notifications'
              >
                Notifications
              </Link>
            </div>
            <div>
              <Link className='link' to='/profile/tp'>
                Profile
              </Link>
            </div>
            <div>
              <button
                className='login-button'
                onClick={() => {this.props.firebase.logout();window.location.href="/"}}
              >
                Logout
              </button>
            </div>
          </div>
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
