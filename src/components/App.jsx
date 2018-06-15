import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import AppHistory from 'utils/History';
import constants from 'constants';

import MainPageContainer from 'containers/MainPageContainer';
import AboutPageContainer from 'containers/AboutPageContainer';
import SearchPageContainer from 'containers/SearchPageContainer';
import OfficerSummaryContainer from 'containers/OfficerPage/OfficerSummaryContainer';
import OfficerTimelineContainer from 'containers/OfficerPage/OfficerTimelineContainer';
import ComplaintPageContainer from 'containers/ComplaintPageContainer';
import TRRPageContainer from 'containers/TRRPageContainer';
import LandingPageContainer from 'containers/LandingPageContainer';

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
