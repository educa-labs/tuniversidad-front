import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import News from '../containers/News';
import Landing from '../containers/Landing';
import Buscador from '../containers/Buscador';
import Compare from '../containers/Compare';
import Recommend from '../containers/Recommend';
import Newton from '../containers/Newton';
import Site from '../containers/Site';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="site" component={Site}>
      <IndexRoute component={Buscador} />
      <Route path="search" component={Buscador} />
      <Route path="compare" component={Compare} />
      <Route path="recomend" component={Recommend} />
      <Route path="news" component={News} />
      <Route path="newton" component={Newton} />
    </Route>
  </Route>
);
