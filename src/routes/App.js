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

    const AuthComponent =
      !uid ? <Redirect to="/register" /> :
      !onboarded ? <PageOnboard /> :
      !emailVerified ? <PageConfirmEmail /> : null;

    return (
      <div className="App">

        <Switch>
          {/* routes that completely require login */}
          <Route exact path="/profile/:historyParam?">
            {AuthComponent || <PageProfile uid={uid} />}
          </Route>

          <Route exact path="/notifications">
            {AuthComponent || <PageNotifications uid={uid} />}
          </Route>

          <Route
            exact path="/tp/:questId/:tpId"
            render={props =>
              AuthComponent ||
                <TpWrapper
                  uid={uid}
                  questId={props.match.params.questId}
                />}
          />

          {/* other routes that conditionally render based on login status */}
          <Route
            path="/q/:questId"
            render={props =>
              <TpWrapper
                question={questions && questions[props.match.params.questId]}
                questId={props.match.params.questId}
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
              />}
          />

          <Route
            exact path="/questions/:tag?"
            render={props =>
              <PageProblems
                questions={questions}
                questionHistory={questionHistory}
                tag={props.match.params.tag}
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
    questionHistory: state.firebase.data.questionHistory,
  };
}

export default compose(
  firebaseConnect(props => [
    { path: '/questions' },
    { path: '/questionHistory/' + props.uid, storeAs: 'questionHistory' },
  ]),
  connect(mapStateToProps)
)(App);
