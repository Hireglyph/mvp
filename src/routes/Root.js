/** @jsx jsx */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { jsx } from 'theme-ui';

import App from 'routes/App';
import Auth from 'routes/Auth';

import PageContact from 'pages/PageContact';
import PageLanding from 'pages/PageLanding';
import PageContentPolicy from 'pages/PageContentPolicy';
import PagePrivacyPolicy from 'pages/PagePrivacyPolicy';
import PageNotFound from 'pages/PageNotFound';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

const RootSx = {
  '.root-body': {
    minHeight: 'calc(100vh - 175px)',
  },
}

class Root extends React.Component {
  render() {
    // display loading animation if auth/profile are loading
    if (!this.props.isLoaded) {
      return (
        <div className="Root" sx={RootSx}>
          <NavBar />
            <div className="root-body">
              <Loading />
            </div>
        </div>
      );
    }

    const { emailVerified, onboarded, uid } = this.props;

    return (
      <div className="Root" sx={RootSx}>
        <NavBar uid={uid} isLoaded={this.props.isLoaded} />
        <div className="root-body">
          <Switch>
            {/* authentification routes */}
            <Route
              exact
              path="/(login|register)/"
              render={() =>
                <Auth
                  emailVerified={emailVerified}
                  onboarded={onboarded}
                  uid={uid}
                />}
            />

            {/* main routes */}
            <Route
              path="/(profile|notifications|tp|q|questions|addquestion)/"
              render={() =>
                <App
                  emailVerified={emailVerified}
                  onboarded={onboarded}
                  uid={uid}
                />}
            />

            {/* static routes */}
            <Route exact path="/"        component={PageLanding} />
            <Route exact path="/content" component={PageContentPolicy} />
            <Route exact path="/privacy" component={PagePrivacyPolicy} />
            <Route exact path="/contact" component={PageContact} />

            {/* catch broken routes*/}
            <Route component={PageNotFound} />
          </Switch>
        </div>
        {(this.props.location.pathname.split('/')[1] !== 'q') && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, profile } = state.firebase;

  return {
    emailVerified: auth.emailVerified,
    isLoaded: auth.isLoaded && profile.isLoaded,
    onboarded: profile.onboarded,
    uid: auth.uid,
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Root);
