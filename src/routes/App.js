import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import PageAddQuestion from 'pages/PageAddQuestion';
import PageProblems from 'pages/PageProblems';
import PageProfile from 'pages/PageProfile';
import PageNotifications from 'pages/PageNotifications';
import PageConfirmEmail from 'pages/PageConfirmEmail';
import PageOnboard from 'pages/PageOnboard';
import PageNotFound from 'pages/PageNotFound';

import TpWrapper from 'routes/TpWrapper';

class App extends React.Component {
  render() {
    const {
      emailVerified,
      onboarded,
      questions,
      questionHistory,
      uid
    } = this.props;

    return (
      <div className="App">
        <Switch>
          {/* routes that completely require login */}
          <Route
            path="/(profile|notifications|tp)"
            render={() =>
              !uid ? <Redirect to="/register" /> :
              !onboarded ? <PageOnboard /> :
              !emailVerified ? <PageConfirmEmail /> : (
                <Switch>
                  {/* Profile Page */}
                  <Route exact path="/profile/:historyParam?">
                    <PageProfile uid={uid} />
                  </Route>

                  {/* Notifications Page */}
                  <Route exact path="/notifications">
                    <PageNotifications uid={uid} />
                  </Route>

                  {/* TP Page */}
                  <Route exact path="/tp/:questId/:tpId">
                    <TpWrapper uid={uid} />
                  </Route>
                </Switch>
              )
            }
          />

          {/* other routes that conditionally render based on login status */}
          <Route
            path="/q"
            render={() =>
              <TpWrapper
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
              />}
          />

          <Route
            exact path="/questions/:tag?"
            render={() =>
              <PageProblems
                questions={questions}
                questionHistory={questionHistory}
                uid={uid}
              />
            }
          />

          <Route exact path="/addquestion">
            <PageAddQuestion questions={questions} uid={uid} />
          </Route>

          {/* catch broken routes */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.firebase.data.questions,
    questionHistory: state.firebase.data.questionHistory || {},
  };
}

export default compose(
  firebaseConnect(props => [
    { path: '/questions' },
    { path: '/questionHistory/' + props.uid, storeAs: 'questionHistory' },
  ]),
  connect(mapStateToProps)
)(App);
