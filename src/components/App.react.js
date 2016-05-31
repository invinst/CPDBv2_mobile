import React from 'react';
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'

import AppHistory from 'utils/History';

import ComplaintPage from 'components/ComplaintPage.react';
import MainPage from 'components/MainPage.react';
import NoMatch from 'components/NoMatch.react';
import OfficerPage from 'components/OfficerPage.react';

import style from 'styles/Style.sass';
import fonts from 'styles/Fonts.sass';
import grid from 'styles/Grid.sass';
import helper from 'styles/Helper.sass';
import icon from 'styles/Ratchicons.sass'


const App = React.createClass({
  render() {
    return (
      <Router history={ AppHistory }>
        <Route path='/complaint/:crid/:slug/:categoryHashId' component={ ComplaintPage } />
        <Route path='/officer/:slug/:id' component={ OfficerPage } />
        <Route path='/s/:query' component={ MainPage } />
        <Route path='/q/:query' component={ MainPage } />
        <Route path='/' component={ MainPage } />
        <Route path='*' component={ NoMatch } />
      </Router>
    );
  }
});

export default App;
