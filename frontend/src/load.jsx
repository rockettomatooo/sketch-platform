import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';


import 'regenerator-runtime/runtime';

import Router from './Router';
import Store from './state/Store';
import History from './state/history';


ReactDOM.render(
  <StoreProvider store={createStore(Store)}>
    <BrowserRouter history={History}>
      <Router />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
);
