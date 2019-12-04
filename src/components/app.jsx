import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import Modal from 'react-modal';

import AppHistory from 'utils/history';
import constants from 'constants';

import MainPageContainer from 'containers/main-page-container';
import AboutPageContainer from 'containers/about-page-container';
import SearchPageContainer from 'containers/search-page-container';
import OfficerPageContainer from 'containers/officer-page-container';
import ComplaintPageContainer from 'containers/complaint-page-container';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';
import BreadcrumbItemContainer from 'containers/breadcrumb-container';
import TopOfficersByAllegationContainer from 'containers/landing-page/top-officers-by-allegation';
import OfficersContainer from 'containers/embed/officers';
import PinboardPageContainer from 'containers/pinboard-page';

import 'swiper/dist/css/swiper.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'styles/fonts.sass';
import 'styles/style.sass';
import 'styles/helper.sass';
import 'styles/custom-mapbox-gl.sass';

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
            breadcrumb='Search'
            path={ constants.SEARCH_PATH }
            component={ SearchPageContainer }>
            <Route
              path={ constants.SEARCH_PATH + ':query' }
              component={ SearchPageContainer }
              useParentBreadcrumb={ true } />
          </Route>

          <Route
            breadcrumbKey={ `${constants.OFFICER_PATH}:id` }
            path={ `${constants.OFFICER_PATH}:id(/:firstParam)(/:secondParam)` }
            breadcrumb={ BreadcrumbItemContainer }
            component={ OfficerPageContainer }> >
          </Route>

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

          <Route
            path={ `${constants.PINBOARD_PATH}(:pinboardId/)(:pinboardTitle/)` }
            breadcrumb={ BreadcrumbItemContainer }
            component={ PinboardPageContainer }
          />
          <Redirect
            from={ `${constants.PINBOARD_SOCIAL_GRAPH_REDIRECT_PATH}:pinboardId/` }
            to={ `${constants.PINBOARD_PATH}:pinboardId/` }
          />

        </Route>
        <Route
          path={ constants.EMBED_TOP_OFFICER_PATH }
          component={ () => <TopOfficersByAllegationContainer pinnable={ false }/> }
        />
        <Route
          path={ constants.EMBED_OFFICERS_PATH }
          component={ OfficersContainer }
        />

        <Redirect from='*' to='/'/>
      </Router>
    );
  },
});

export default App;
