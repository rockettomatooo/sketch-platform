import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import 'regenerator-runtime/runtime';

import Router from './Router';

ReactDOM.render(
  <BrowserRouter history={createBrowserHistory()}>
    <Router />
  </BrowserRouter>,
  document.getElementById('root'),
);
