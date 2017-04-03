import React from 'react';
import { Route } from 'react-router';

import App from '../containers/App';
import CareerView from '../components/CareerView';
import Buscador from '../containers/Buscador';
import Compare from '../containers/Compare';

export default (
  <Route path="/" component={App}>
    <Route path="search" component={Buscador} />
    <Route path="compare" component={Compare} />
    <Route path="careers/:id" component={CareerView} />
  </Route>
);
