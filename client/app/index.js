import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Store.js';
import App from './App.js';


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>
  , document.getElementById('app'));
