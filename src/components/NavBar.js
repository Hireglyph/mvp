/** @jsx jsx */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
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

  '.title-text': {
    fontSize: '30px',
    color: 'text',
    textDecoration: 'none',
  },

  '.link-text, .button-text': {
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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (link) => () => this.props.history.push(link);

  navbarContent = () => {
    if (!this.props.isLoaded || !isLoaded(this.props.hasNotifs)) {
      return;
    }
    if (!this.props.uid) {
      return (
        <div>
          <div className="link-click">
            <Link className="link-text" to="/register">
              Register
            </Link>
          </div>
          <div className="button-click">
            <button
              className="button-text"
              onClick={this.handleClick("/login")}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className='nav-elements'>
        <div className='link-click2'>
          <Link
          className={!this.props.hasNotifs ? 'link-text' : 'has-notifs link-text'}
          to='/notifications'>
            Notifications
          </Link>
        </div>
        <div className="link-click">
          <Link className="link-text" to="/profile/tp">
            Profile
          </Link>
        </div>
        <div className="button-click">
          <button
            className="button-text"
            onClick={() => {
              this.props.firebase.logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='navbar' sx={NavBarSx}>
        <div className='title'>
          <Link className='title-text' to='/'>Hireglyph</Link>
          <Link className='link-text' to='/questions'>Questions</Link>
        </div>
        {this.navbarContent()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    hasNotifs:
      state.firebase.data.hasNotifs && state.firebase.data.hasNotifs[props.uid],
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: "/hasNotifs/" + props.uid,
    },
  ]),
  connect(mapStateToProps)
)(NavBar);
