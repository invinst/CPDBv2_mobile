import React from 'react';
import PropTypes from 'prop-types';

import style from './trr-map.sass';
import LocationMap from 'components/common/location-map';


export default function TRRMap(props) {
  const { lng, lat } = props;

  return (
    <LocationMap
      lat={ lat }
      lng={ lng }
      mapboxStyle='mapbox://styles/mapbox/light-v9'
      customMarkerClassName={ style.trrMapMarker }
    />
  );
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
