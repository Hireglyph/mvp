import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PageProfile from 'pages/PageProfile';
import PageNotifications from 'pages/PageNotifications';
import PageConfirmEmail from 'pages/PageConfirmEmail';
import PageOnboard from 'pages/PageOnboard';
import PageNotFound from 'pages/PageNotFound';

import TpWrapper from 'routes/TpWrapper';

class App extends React.Component {
  render() {
    const { emailVerified, onboarded, uid } = this.props;

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
          {/* TODO: change question page to check onboarded/emailVerified */}
          <Route
            path="/q"
            render={() =>
              <TpWrapper
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
              />}
          />

          {/* catch broken routes */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
