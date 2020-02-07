import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Modal from 'react-modal';

import constants from 'constants';
import config from 'config';

import 'swiper/dist/css/swiper.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'styles/fonts.sass';
import 'styles/style.sass';
import 'styles/helper.sass';

import SearchPageContainer from 'containers/search-page-container';
import OfficerPageContainer from 'containers/officer-page-container';
import ComplaintPageContainer from 'containers/complaint-page-container';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';
import BreadcrumbItemContainer from 'containers/breadcrumb-container';
import TopOfficersByAllegationContainer from 'containers/landing-page/top-officers-by-allegation';
import OfficersContainer from 'containers/embed/officers';
import PinboardPageContainer from 'containers/pinboard-page';


Modal.setAppElement('body');

export default function App(props) {
  const { pinboard: enablePinboardFeature } = config.enableFeatures;
  const { location } = props;

  return (
    <Switch location={ location }>
      <Route
        exact={ true }
        path='/'
        breadcrumbKey='/'
        breadcrumb='cpdp'
        component={ LandingPageContainer } />

      <Route
        exact={ true }
        breadcrumb='Search'
        path={ constants.SEARCH_PATH }
        component={ SearchPageContainer }>
        {/*<Route*/}
        {/*  path={ constants.SEARCH_PATH + ':query' }*/}
        {/*  component={ SearchPageContainer }*/}
        {/*  useParentBreadcrumb={ true } />*/}
      </Route>

      <Route
        breadcrumbKey={ `${constants.OFFICER_PATH}:id` }
        path={ `${constants.OFFICER_PATH}:id/:firstParam?/:secondParam?` }
        breadcrumb={ BreadcrumbItemContainer }
        component={ OfficerPageContainer } />

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

      {
        enablePinboardFeature &&
        <Route
          path={ `${constants.PINBOARD_PATH}:pinboardId?/:pinboardTitle?/` }
          breadcrumb={ BreadcrumbItemContainer }
          component={ PinboardPageContainer }
        />
      }
      {
        enablePinboardFeature &&
        <Redirect
          from={ `${constants.PINBOARD_SOCIAL_GRAPH_REDIRECT_PATH}:pinboardId/` }
          to={ `${constants.PINBOARD_PATH}:pinboardId/` }
        />
      }
      {
        enablePinboardFeature &&
        <Redirect
          from={ `${constants.PINBOARD_GEOGRAPHIC_REDIRECT_PATH}:pinboardId/` }
          to={ `${constants.PINBOARD_PATH}:pinboardId/` }
        />
      }
      <Route
        exact={ true }
        path={ constants.EMBED_TOP_OFFICER_PATH }
        component={ () => <TopOfficersByAllegationContainer pinnable={ false }/> }
      />
      <Route
        exact={ true }
        path={ constants.EMBED_OFFICERS_PATH }
        component={ OfficersContainer }
      />

      <Redirect from='*' to='/'/>
    </Switch>
  );
}
