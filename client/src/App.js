import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import TeamsPage from './pages/TeamsPage'
import RosterPage from './pages/RosterPage'
import PlayerDetailPage from './pages/PlayerDetailPage'
import PitcherDetailPage from './pages/PitcherDetailPage'

const NoMatchRoute = () => <div>404 Page</div>;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={TeamsPage} />
        <Route path='/team/:id' exact component={RosterPage} />
        <Route path='/player/:id' exact component={PlayerDetailPage} />
        <Route path='/pitcher/:id' exact component={PitcherDetailPage} />
        <Route component={NoMatchRoute} />
      </Switch>
    </Router>
  );
};

export default App;