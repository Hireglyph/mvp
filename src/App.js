import React from 'react';
import PageLanding from './pages/PageLanding';
import PageProfile from './pages/PageProfile';
import PageQuestion from './pages/PageQuestion';
import PageEasyQuestion from './pages/PageEasyQuestion';
import PageTp from './pages/PageTp';
import PageSa from './pages/PageSa';
import PageRegister from './pages/PageRegister';
import PageLogin from './pages/PageLogin';
import PageAddQuestion from './pages/PageAddQuestion';
import NavBar from './components/NavBar';


import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <NavBar />
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
        <Route exact path="/eq/:questId">
          <PageEasyQuestion />
        </Route>
        <Route exact path="/tp/:questId/:tpId">
          <PageTp />
        </Route>
        <Route exact path="/sa/:questId/:saId">
          <PageSa />
        </Route>
        <Route exact path="/register">
          <PageRegister />
        </Route>
        <Route exact path="/login">
          <PageLogin />
        </Route>
        <Route exact path="/addquestion">
          <PageAddQuestion />
        </Route>
        <Route>
          <div>Page not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
