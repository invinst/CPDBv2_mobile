import React from 'react';

import { Router, Route } from 'react-router';

import AppHistory from 'utils/History';
import constants from 'constants';

import MainPageContainer from 'containers/MainPageContainer';
import ComplaintPageContainer from 'containers/ComplaintPageContainer';
import ReportingPageContainer from 'containers/ReportingPageContainer';
import ReportingDetailContainer from 'containers/ReportingPage/ReportingDetailContainer';
import FAQPageContainer from 'containers/FAQPageContainer';
import FAQDetailContainer from 'containers/FAQPage/FAQDetailContainer';
import AboutPageContainer from 'containers/AboutPageContainer';
import SearchPageContainer from 'containers/SearchPageContainer';
import OfficerSummaryContainer from 'containers/OfficerPage/OfficerSummaryContainer';
import OfficerTimelineContainer from 'containers/OfficerPage/OfficerTimelineContainer';

import 'styles/Style.sass';
import 'styles/Fonts.sass';
import 'styles/Grid.sass';
import 'styles/Helper.sass';
import 'styles/Ratchicons.sass';


const App = React.createClass({
  render() {
    return (
      <Router history={ AppHistory }>
        <Route path='/complaint/:crid/:slug/:categoryHashId' component={ ComplaintPageContainer } />
        <Route path='/s/:query' component={ MainPageContainer } />
        <Route path='/q/:query' component={ MainPageContainer } />
        <Route path='/' component={ MainPageContainer }>
          <Route path={ constants.REPORTING_PATH } component={ ReportingPageContainer }>
            <Route path={ constants.REPORTING_PATH + '/:id' } component={ ReportingDetailContainer } />
          </Route>

          <Route path={ constants.FAQ_PATH } component={ FAQPageContainer }>
            <Route path={ constants.FAQ_PATH + '/:id' } component={ FAQDetailContainer } />
          </Route>

          <Route path={ constants.ABOUT_PATH } component={ AboutPageContainer } />

          <Route path={ constants.SEARCH_PATH } component={ SearchPageContainer }>
            <Route path={ constants.SEARCH_PATH + '/:query' } component={ SearchPageContainer } />
          </Route>

          <Route path={ `${constants.OFFICER_PATH}/:id/summary` } component={ OfficerSummaryContainer } />
          <Route path={ `${constants.OFFICER_PATH}/:id/timeline` } component={ OfficerTimelineContainer } />

        </Route>
      </Router>
    );
  }
});

export default App;
