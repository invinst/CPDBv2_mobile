import React from 'react';
import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
// import ComplaintPage from 'components/ComplaintPage.react';
import MainPage from 'components/MainPage.react';
import NoMatch from 'components/NoMatch.react';
// import OfficerPage from 'components/OfficerPage.react';

import style from 'styles/Style.sass';
import fonts from 'styles/Fonts.sass';
import grid from 'styles/Grid.sass';
import helper from 'styles/Helper.sass';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import { createHistory } from 'history'

const history = useRouterHistory(createHistory)({
  basename: '/'
});

const App = React.createClass({
  render() {
    return (
      <Router history={ history }>
        <Route path='/s/:query' component={ MainPage } />
        <Route path='/q/:query' component={ MainPage } />
        <Route path='/' component={ MainPage } />
        <Route path='*' component={ NoMatch } />
      </Router>
    );
  }
});

export default App;

/*
        <Route path='/complaint/:crid/:slug/:categoryHashId' component={ ComplaintPage } />
        <Route path='/officer/:slug/:id' component={ OfficerPage } />
        <Route path='/s/:query' component={ MainPage } />
        <Route path='/q/:query' component={ MainPage } />
        <Route path='/' component={ MainPage } />
        <Route path='*' component={ NoMatch } />
*/
