import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PageRegister from 'pages/PageRegister';
import PageLogin from 'pages/PageLogin';
import PageConfirmEmail from 'pages/PageConfirmEmail';
import PageOnboard from 'pages/PageOnboard';

class Auth extends React.Component {
  render() {
    const { emailVerified, onboarded, uid } = this.props;

    if (uid) {
      // not onboarded (i.e. no username)
      if (!onboarded) {
        return <PageOnboard />;
      }
      // email not verified yet
      if (!emailVerified) {
        return <PageConfirmEmail />;
      }
      return <Redirect to="/questions" />;
    }

    // if no uid, go to register or login
    return (
      <div className="Auth">
        <Switch>
          <Route exact path="/register" component={PageRegister} />
          <Route exact path="/login" component={PageLogin} />
        </Switch>
      </div>
    );
  }
}

export default Auth;
