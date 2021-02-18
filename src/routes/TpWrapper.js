import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageQuestion from 'pages/PageQuestion';
import PageTp from 'pages/PageTp';
import PageNotFound from 'pages/PageNotFound';

class TpWrapper extends React.Component {
  render() {
    const { uid } = this.props;

    return (
      <div className="TpWrapper">
        <Switch>
          {/* Question Page */}
          <Route exact path="/q/:questId/:questParam?">
            <PageQuestion uid={uid} />
          </Route>
          <Route exact path="/q/:questId/community/:sortBy">
            <PageQuestion uid={uid} />
          </Route>

          {/* TP Page */}
          <Route exact path="/tp/:questId/:tpId">
            <PageTp uid={uid} />
          </Route>

          {/* catch broken routes */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default TpWrapper;
