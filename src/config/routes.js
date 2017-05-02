import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import CareerView from '../containers/CareerView';
import Landing from '../containers/Landing';
import Buscador from '../containers/Buscador';
import Compare from '../containers/Compare';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="search" component={Buscador} />
    <Route path="compare" component={Compare} />
    <Route path="careers/:id" component={CareerView} />
  </Route>
);
