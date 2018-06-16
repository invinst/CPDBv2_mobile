import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import AppHistory from 'utils/History';
import constants from 'constants';

import MainPageContainer from 'containers/main-page-container';
import AboutPageContainer from 'containers/about-page-container';
import SearchPageContainer from 'containers/search-page-container';
import OfficerSummaryContainer from 'containers/officer-page/officer-summary-container';
import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import ComplaintPageContainer from 'containers/ComplaintPageContainer';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';

import 'styles/Style.sass';
import 'styles/Fonts.sass';
import 'styles/Grid.sass';
import 'styles/Helper.sass';
import 'styles/Ratchicons.sass';


const App = React.createClass({
  render() {
    return (
      <Router history={ AppHistory }>
        <Route path='/' component={ MainPageContainer }>
          <IndexRoute component={ LandingPageContainer } />

          <Route path={ constants.ABOUT_PATH } component={ AboutPageContainer } />

          <Route path={ constants.SEARCH_PATH } component={ SearchPageContainer }>
            <Route path={ constants.SEARCH_PATH + ':query' } component={ SearchPageContainer } />
          </Route>

          <Route path={ `${constants.OFFICER_PATH}:id/` } component={ OfficerSummaryContainer } />
          <Route path={ `${constants.OFFICER_PATH}:id/timeline/` } component={ OfficerTimelineContainer } />

          <Route
            path={ `${constants.COMPLAINT_PATH}:complaintId/:coaccusedId/` }
            component={ ComplaintPageContainer }
          />

          <Route
            path={ `${constants.TRR_PATH}:trrId/` }
            component={ TRRPageContainer }
          />

        </Route>
      </Router>
    );
  }
});

export default App;
