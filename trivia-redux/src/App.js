import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import NotFound from './pages/NotFound';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

// <div className="App">
//   <header className="App-header">
//     <img src={ logo } className="App-logo" alt="logo" />
//     <Login />
//   </header>
// </div>
