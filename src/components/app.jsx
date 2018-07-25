import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Modal from 'react-modal';
import config from 'config';

import AppHistory from 'utils/history';
import constants from 'constants';

import MainPageContainer from 'containers/main-page-container';
import AboutPageContainer from 'containers/about-page-container';
import SearchPageContainer from 'containers/search-page-container';
import OfficerPageContainer from 'containers/officer-page-container';
import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import ComplaintPageContainer from 'containers/complaint-page-container';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';
import BreadcrumbItemContainer from 'containers/breadcrumb-container';

import 'swiper/dist/css/swiper.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'styles/fonts.sass';
import 'styles/style.sass';
import 'styles/helper.sass';


window.Intercom('boot', { 'app_id': config.intercomAppId } );
Modal.setAppElement('body');

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
            component={ OfficerPageContainer } />
          <Route
            path={ `${constants.OFFICER_PATH}:id/timeline/` }
            breadcrumb='Timeline'
            component={ OfficerTimelineContainer } />

          <Route
            path={ `${constants.COMPLAINT_PATH}:complaintId/` }
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
