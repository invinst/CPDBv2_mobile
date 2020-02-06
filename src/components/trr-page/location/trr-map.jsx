import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './trr-map.sass';
import LocationMap from 'components/common/location-map';


export default class TRRMap extends Component {

  render() {
    const { lng, lat } = this.props;

    return (
      <LocationMap
        lat={ lat }
        lng={ lng }
        mapboxStyle='mapbox://styles/mapbox/light-v9'
        customMarkerClassName={ style.trrMapMarker }
      />
    );
  }
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
