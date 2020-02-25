import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import 'swiper/dist/css/swiper.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'styles/fonts.sass';
import 'styles/style.sass';
import 'styles/helper.sass';

import config from 'config';
import SearchPageContainer from 'containers/search-page-container';
import OfficerPageContainer from 'containers/officer-page-container';
import ComplaintPageContainer from 'containers/complaint-page-container';
import TRRPageContainer from 'containers/trr-page-container';
import LandingPageContainer from 'containers/landing-page-container';
import TopOfficersByAllegationContainer from 'containers/landing-page/top-officers-by-allegation';
import OfficersContainer from 'containers/embed/officers';
import PinboardPageContainer from 'containers/pinboard-page';
import {
  SEARCH_ROUTER_PATH,
  OFFICER_ROUTER_PATH,
  COMPLAINT_ROUTER_PATH,
  TRR_ROUTER_PATH,
  PINBOARD_ROUTER_PATH,
  PINBOARD_SOCIAL_GRAPH_REDIRECT_ROUTER_PATH,
  PINBOARD_GEOGRAPHIC_REDIRECT_ROUTER_PATH,
  PINBOARD_REDIRECT_ROUTER_PATH,
  EMBED_TOP_OFFICER_ROUTER_PATH,
  EMBED_OFFICERS_ROUTER_PATH,
} from 'constants/paths';


export default function RouterRoot(props) {
  const { pinboard: enablePinboardFeature } = config.enableFeatures;
  const { location } = props;

  return (
    <Switch location={ location }>
      <Route
        exact={ true }
        path='/'
        component={ LandingPageContainer } />

      <Route
        exact={ true }
        path={ SEARCH_ROUTER_PATH }
        component={ SearchPageContainer }
      />

      <Route
        path={ OFFICER_ROUTER_PATH }
        component={ OfficerPageContainer } />

      <Route
        path={ COMPLAINT_ROUTER_PATH }
        component={ ComplaintPageContainer }
      />

      <Route
        path={ TRR_ROUTER_PATH }
        component={ TRRPageContainer }
      />

      {
        enablePinboardFeature &&
        <Route
          path={ PINBOARD_ROUTER_PATH }
          component={ PinboardPageContainer }
        />
      }
      {
        enablePinboardFeature &&
        <Redirect
          from={ PINBOARD_SOCIAL_GRAPH_REDIRECT_ROUTER_PATH }
          to={ PINBOARD_REDIRECT_ROUTER_PATH }
        />
      }
      {
        enablePinboardFeature &&
        <Redirect
          from={ PINBOARD_GEOGRAPHIC_REDIRECT_ROUTER_PATH }
          to={ PINBOARD_REDIRECT_ROUTER_PATH }
        />
      }
      <Route
        exact={ true }
        path={ EMBED_TOP_OFFICER_ROUTER_PATH }
        component={ () => <TopOfficersByAllegationContainer pinnable={ false }/> }
      />
      <Route
        exact={ true }
        path={ EMBED_OFFICERS_ROUTER_PATH }
        component={ OfficersContainer }
      />

      <Redirect from='*' to='/'/>
    </Switch>
  );
}

RouterRoot.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
};
