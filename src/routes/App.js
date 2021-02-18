import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PageProfile from 'pages/PageProfile';
import PageNotifications from 'pages/PageNotifications';
import PageConfirmEmail from 'pages/PageConfirmEmail';
import PageOnboard from 'pages/PageOnboard';

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
                  <Route exact path="/profile/:historyParam?">
                    <PageProfile uid={uid} />
                  </Route>
                  <Route exact path="/notifications">
                    <PageNotifications uid={uid} />
                  </Route>
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
            render={() => <TpWrapper uid={uid} />}
          />

        </Switch>
      </div>
    );
  }
}

export default App;
