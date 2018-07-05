import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Modal from 'react-modal';

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

import 'styles/style.sass';
import 'styles/fonts.sass';
import 'styles/helper.sass';
import 'mapbox-gl/dist/mapbox-gl.css';


Modal.setAppElement('body');

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

          <Route path={ `${constants.OFFICER_PATH}:id/` } component={ OfficerPageContainer } />
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
