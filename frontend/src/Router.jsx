import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import { Topbar } from './layout';
import { CreateRoute, ListRoute, DetailsRoute } from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './routes/ErrorFallback';

export default function Router() {
  const hasError = useStoreState((state) => state.hasError);

  return (
    <>
      <Topbar />
      <ErrorBoundary error={hasError} fallback={<ErrorFallback />}>
        <Switch>
          <Route path="/create" component={CreateRoute} />
          <Route path="/sketches/:_id" component={DetailsRoute} />
          <Route path="/sketches" component={ListRoute} />
          <Route render={() => <Redirect to="/sketches" />} />
        </Switch>
      </ErrorBoundary>
    </>
  );
}
