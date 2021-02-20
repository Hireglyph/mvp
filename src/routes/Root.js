import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import App from 'routes/App';
import Auth from 'routes/Auth';

import PageProblems from 'pages/PageProblems';
import PageAddQuestion from 'pages/PageAddQuestion';
import PageContact from 'pages/PageContact';
import PageLanding from 'pages/PageLanding';
import PageContentPolicy from 'pages/PageContentPolicy';
import PagePrivacyPolicy from 'pages/PagePrivacyPolicy';
import PageNotFound from 'pages/PageNotFound';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

class Root extends React.Component {
  render() {
    if (!this.props.isLoaded) {
      return (
        <div className="Root">
          <NavBar />
          <Loading />
          <Footer />
        </div>
      );
    }

    const { emailVerified, onboarded, questions, uid } = this.props;

    return (
      <div className="Root">
        <NavBar uid={uid} isLoaded={this.props.isLoaded} />

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

          {/* routes that need login status for access */}
          <Route
            path="/(profile|notifications|tp|q)/"
            render={() =>
              <App
                emailVerified={emailVerified}
                onboarded={onboarded}
                uid={uid}
              />}
          />

          {/* open routes (login not required) */}
          <Route exact path="/questions/:tag?">
            <PageProblems questions={questions} uid={uid} />
          </Route>

          {/* static routes */}
          <Route exact path="/"        component={PageLanding} />
          <Route exact path="/content" component={PageContentPolicy} />
          <Route exact path="/privacy" component={PagePrivacyPolicy} />
          <Route exact path="/contact" component={PageContact} />

          {/* admin portal */}
          {/* TODO: modify PageAddQuestion to grab uid here
              and add to the routes that need login access */}
          <Route exact path="/addquestion">
            <PageAddQuestion questions={questions} />
          </Route>

          {/* catch broken routes*/}
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, data, profile } = state.firebase;

  return {
    emailVerified: auth.emailVerified,
    isLoaded: auth.isLoaded && profile.isLoaded,
    onboarded: profile.onboarded,
    questions: data.questions,
    uid: auth.uid,
  }
};

export default compose(
  firebaseConnect(['/questions']),
  connect(mapStateToProps)
)(Root);
