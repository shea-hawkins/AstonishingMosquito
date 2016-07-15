import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import Store from './Store.js';
import App from './App.js';
import GameView from './resources/gameView/GameView';
import LibraryView from './resources/libraryView/LibraryView';


// TODO add default router
ReactDOM.render(
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/' component={LibraryView} />
        <Route path='game' component={GameView}/>
        <Route path='library' component={LibraryView}/>
        <Route path='*' component={LibraryView} />
      </ Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
