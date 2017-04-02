import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import Home from '../containers/Home';
import Careers from '../containers/Careers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="careers" component={Careers} />
  </Route>
);
