import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import PageProblems from 'pages/PageProblems';
import PageProfile from 'pages/PageProfile';
import PageQuestion from 'pages/PageQuestion';
import PageTp from 'pages/PageTp';
import PageRegister from 'pages/PageRegister';
import PageLogin from 'pages/PageLogin';
import PageAddQuestion from 'pages/PageAddQuestion';
import PageNotifications from 'pages/PageNotifications';
import PageContact from 'pages/PageContact';
import PageLanding from 'pages/PageLanding';
import PageContentPolicy from 'pages/PageContentPolicy';
import PagePrivacyPolicy from 'pages/PagePrivacyPolicy';
import PageNotFound from 'pages/PageNotFound';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar uid={this.props.uid} isLoaded={this.props.isLoaded} />

        <Switch>
          {/* authentification routes */}
          <Route exact path="/register">
            <PageRegister
              uid={this.props.uid}
              onboarded={this.props.onboarded}
              isLoaded={this.props.isLoaded}
            />
          </Route>
          <Route exact path="/login">
            <PageLogin
              uid={this.props.uid}
              onboarded={this.props.onboarded}
              isLoaded={this.props.isLoaded}
            />
          </Route>

          {/* routes that require login for access */}
          <Route exact path="/profile/:historyParam?">
            <PageProfile uid={this.props.uid} />
          </Route>
          <Route exact path="/notifications">
            <PageNotifications
              uid={this.props.uid}
              onboarded={this.props.onboarded}
              isLoaded={this.props.isLoaded}
            />
          </Route>
          <Route exact path="/tp/:questId/:tpId">
            <PageTp />
          </Route>

          <Route exact path="/q/:questId/:questParam?">
            <PageQuestion uid={this.props.uid} />
          </Route>
          <Route exact path="/q/:questId/community/:sortBy">
            <PageQuestion uid={this.props.uid} />
          </Route>

          <Route exact path="/addquestion">
            <PageAddQuestion />
          </Route>
          <Route exact path="/questions/:tag?">
            <PageProblems uid={this.props.uid} />
          </Route>

          <Route exact path="/">
            <PageLanding />
          </Route>

          {/* static routes */}
          <Route exact path="/content" component={PageContentPolicy} />
          <Route exact path="/privacy" component={PagePrivacyPolicy} />
          <Route exact path="/contact" component={PageContact} />

          {/* catch broken routes*/}
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, _props) => {
  return {
    uid: state.firebase.auth.uid,
    onboarded: state.firebase.profile.onboarded,
    isLoaded: state.firebase.auth.isLoaded && state.firebase.profile.isLoaded,
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(App);
