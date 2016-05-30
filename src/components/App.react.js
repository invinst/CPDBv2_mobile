import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
// import ComplaintPage from 'components/ComplaintPage.react';
import MainPage from 'components/MainPage.react';
import NoMatch from 'components/NoMatch.react';
// import OfficerPage from 'components/OfficerPage.react';


const App = React.createClass({
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='*' component={ NoMatch } />
        <Route path='/' component={ MainPage } />
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
