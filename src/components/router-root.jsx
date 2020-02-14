import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

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
import TopOfficersByAllegationContainer from 'containers/landing-page/top-officers-by-allegation';
import OfficersContainer from 'containers/embed/officers';
import PinboardPageContainer from 'containers/pinboard-page';


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
        path={ constants.SEARCH_PATH }
        component={ SearchPageContainer }
      />

      <Route
        path={ `${constants.OFFICER_PATH}:id/:firstParam?/:secondParam?` }
        component={ OfficerPageContainer } />

      <Route
        path={ `${constants.COMPLAINT_PATH}:complaintId/` }
        component={ ComplaintPageContainer }
      />

      <Route
        path={ `${constants.TRR_PATH}:trrId/` }
        component={ TRRPageContainer }
      />

      {
        enablePinboardFeature &&
        <Route
          path={ `${constants.PINBOARD_PATH}:pinboardId?/:pinboardTitle?/` }
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

RouterRoot.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
};
