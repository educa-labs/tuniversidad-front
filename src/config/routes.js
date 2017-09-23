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
import University from '../containers/University';
import Career from '../containers/Career';
import Profile from '../containers/Profile';
import Login from '../containers/Login';
import Signup from '../components/Signup';
import EditObjectives from '../components/forms/EditObjectives';
import NewEssay from '../components/forms/NewEssay';
import Filters from '../components/buscador/Filters';
import EditUser from '../components/forms/EditUser';
import Terms from '../components/landing/Terms';

export default (
  <Route path="/" component={App}>
    <Route path="search" component={Buscador} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="filters" component={Filters} />
    <Route path="terms" component={Terms} />
    <Route path="university/:id" component={University} />
    <Route path="career/:id" component={Career} />
    <Route path="site" component={Site}>
      <IndexRoute component={Profile} />
      <Route path="search" component={Buscador} />
      <Route path="compare" component={Compare} />
      <Route path="recommend" component={Recommend} />
      <Route path="news" component={News} />
      <Route path="newton" component={Newton} />
      <Route path="university/:id" component={University} />
      <Route path="career/:id" component={Career} />
      <Route path="profile" component={Profile} />
      <Route path="profile/edit/objectives" component={EditObjectives} />
      <Route path="profile/new/essay" component={NewEssay} />
      <Route path="profile/edit/user" component={EditUser} />
    </Route>
  </Route>
);
