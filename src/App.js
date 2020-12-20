import React from 'react';
import PageLanding from './pages/PageLanding';
import PageProfile from './pages/PageProfile';
import PageQuestion from './pages/PageQuestion';
import PageEasyQuestion from './pages/PageEasyQuestion';
import PageTp from './pages/PageTp';
import PageSa from './pages/PageSa';
import PageRegister from './pages/PageRegister';
import PageOnboard from './pages/PageOnboard';
import PageLogin from './pages/PageLogin';
import PageAddQuestion from './pages/PageAddQuestion';
import PageNotifications from './pages/PageNotifications';
import NavBar from './components/NavBar';

import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div>
      <NavBar uid={this.props.uid} />
        <Switch>
          <Route exact path="/">
            <PageLanding uid={this.props.uid} />
          </Route>
          <Route exact path="/profile">
            <PageProfile uid={this.props.uid} />
          </Route>
          <Route exact path="/notifications">
            <PageNotifications uid={this.props.uid} onboarded={this.props.onboarded} />
          </Route>
          <Route exact path="/q/:questId">
            <PageQuestion />
          </Route>
          <Route exact path="/eq/:questId">
            <PageEasyQuestion />
          </Route>
          <Route exact path="/tp/:questId/:tpId">
            <PageTp />
          </Route>
          <Route exact path="/sa/:questId/:saId">
            <PageSa />
          </Route>
          <Route exact path="/register">
            <PageRegister />
          </Route>
          <Route exact path="/login">
            <PageLogin />
          </Route>
          <Route exact path="/addquestion">
            <PageAddQuestion />
          </Route>
          <Route>
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    uid: state.firebase.auth.uid,
    onboarded: state.firebase.profile.onboarded,
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(App);
