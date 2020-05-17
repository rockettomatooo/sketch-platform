import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Topbar } from './layout';
import { CreateRoute, ListRoute, DetailsRoute } from './routes';


export default function Router() {
  return (
    <>
      <Topbar />
      <Switch>
        <Route path="/create" component={CreateRoute} />
        <Route path="/sketches/:_id" component={DetailsRoute} />
        <Route path="/sketches" component={ListRoute} />
        <Route render={() => <Redirect to="/sketches" />} />
      </Switch>
    </>
  );
}
