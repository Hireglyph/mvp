import React from 'react';
import PageLanding from './pages/PageLanding';
import PageProfile from './pages/PageProfile';
import PageQuestion from './pages/PageQuestion';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <PageLanding />
      </Route>
      <Route exact path="/profile">
        <PageProfile />
      </Route>
      <Route exact path="/q/:questId">
        <PageQuestion />
      </Route>
      <Route>
        <div>Page not found</div>
      </Route>
    </Switch>
  );
}

export default App;
