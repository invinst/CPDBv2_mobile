import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import AppHistory from 'utils/history';
import constants from 'constants';

import MainPageContainer from 'containers/main-page-container';
import AboutPageContainer from 'containers/about-page-container';
import SearchPageContainer from 'containers/search-page-container';
import OfficerSummaryContainer from 'containers/officer-page/officer-summary-container';
import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import ComplaintPageContainer from 'containers/ComplaintPageContainer';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';
import BreadcrumbItemContainer from 'containers/breadcrumb-container';

import 'styles/style.sass';
import 'styles/fonts.sass';
import 'styles/helper.sass';


const App = React.createClass({
  render() {
    return (
      <Router history={ AppHistory }>
        <Route
          path='/(edit)'
          component={ MainPageContainer }
          breadcrumbKey='/'
        >
          <IndexRoute
            breadcrumbKey='/'
            breadcrumb='cpdp'
            component={ LandingPageContainer } />

          <Route
            breadcrumbKey={ constants.ABOUT_PATH }
            path={ constants.ABOUT_PATH }
            component={ AboutPageContainer } />

          <Route
            breadcrumbKey='/'
            breadcrumb='cpdp'
            path={ constants.SEARCH_PATH }
            component={ SearchPageContainer }>
            <Route
              path={ constants.SEARCH_PATH + ':query' }
              component={ SearchPageContainer }
              useParentBreadcrumb={ true } />
          </Route>

          <Route
            path={ `${constants.OFFICER_PATH}:id/` }
            breadcrumb={ BreadcrumbItemContainer }
            component={ OfficerSummaryContainer } />
          <Route
            path={ `${constants.OFFICER_PATH}:id/timeline/` }
            breadcrumb='Timeline'
            component={ OfficerTimelineContainer } />

          <Route
            path={ `${constants.COMPLAINT_PATH}:complaintId/:coaccusedId/` }
            breadcrumb={ BreadcrumbItemContainer }
            component={ ComplaintPageContainer }
          />

          <Route
            path={ `${constants.TRR_PATH}:trrId/` }
            breadcrumb={ BreadcrumbItemContainer }
            component={ TRRPageContainer }
          />

        </Route>
      </Router>
    );
  }
});

export default App;
