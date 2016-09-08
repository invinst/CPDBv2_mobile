import React from 'react';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';

import AppHistory from 'utils/History';

import MainPageContainer from 'containers/MainPageContainer';
import OfficerPageContainer from 'containers/OfficerPageContainer';

import 'styles/Style.sass';
import 'styles/Fonts.sass';
import 'styles/Grid.sass';
import 'styles/Helper.sass';
import 'styles/Ratchicons.sass';


const App = React.createClass({
  render() {
    return (
      <Router history={ AppHistory }>
        <Route path='/officer/:slug/:id' component={ OfficerPageContainer } />
        <Route path='/s/:query' component={ MainPageContainer } />
        <Route path='/q/:query' component={ MainPageContainer } />
        <Route path='/' component={ MainPageContainer } />
      </Router>
    );
  }
});

export default App;
