import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faArrowsAltH, faArrowsAltV, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import './App.css';

import TeamsPage from './components/pages/TeamsPage'
import RosterPage from './components/pages/RosterPage'
import PlayerDetailPage from './components/pages/PlayerDetailPage'
import PitcherDetailPage from './components/pages/PitcherDetailPage'

library.add(fas, faArrowsAltH, faArrowsAltV, faQuestionCircle)

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