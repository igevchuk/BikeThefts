import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from 'app/containers/Home';
import IncidentDetails from 'app/containers/IncidentDetails';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="incident/:id" component={IncidentDetails} />
  </Switch>
));
