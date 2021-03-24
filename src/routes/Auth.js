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
      if (!onboarded) {
        return <PageOnboard />;
      }
      if (!emailVerified) {
        return <PageConfirmEmail />;
      }
      return <Redirect to="/questions" />;
    }

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
