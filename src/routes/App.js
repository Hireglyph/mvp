import React from 'react';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

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

    const questIsLoaded = isLoaded(questions);

    return (
      <div className="App">

        <Switch>
          {/* routes that completely require login */}
          <Route exact path="/profile/:historyParam?">
            {
              AuthComponent ||
              <PageProfile
                uid={uid}
                questions={questions}
                questionHistory={questionHistory}
              />
            }
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
                questIsLoaded={questIsLoaded}
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
                isPageQuestion={true}
              />}
          />

          <Route
            exact path="/questions/:tag?"
            render={props =>
              <PageProblems
                questions={questions}
                questionHistory={questionHistory}
                tag={queryString.parse(this.props.location.search).tag}
                diff={queryString.parse(this.props.location.search).diff}
                company={queryString.parse(this.props.location.search).company}
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
  withRouter,
  firebaseConnect(props => [
    { path: '/questions' },
    { path: '/questionHistory/' + props.uid, storeAs: 'questionHistory' },
  ]),
  connect(mapStateToProps)
)(App);
