import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';

import style from './location-map.sass';
import { mapboxgl } from 'utils/mapbox';


export default class LocationMap extends Component {

  componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng, zoomInLevel } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng, nextProps.markerEl);

      if (this.map.getZoom() === zoomInLevel) {
        this.zoomOut();
      }
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      this.el = el;
      const { lat, lng, mapboxStyle, markerEl, zoomOutLevel, centerLng, centerLat } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: mapboxStyle,
        zoom: zoomOutLevel,
        center: [centerLng, centerLat],
        interactive: false
      });
      this.map.on('click', this.handleMapClick.bind(this));
      this.addMarker(lat, lng, markerEl);
    }
  }

  addMarker(lat, lng, markerEl) {
    if (!this.marker) {
      const placeholder = document.createElement('div');

      const markerDOM = render(
        markerEl || <div className='default-marker'/>,
        placeholder
      );

      this.marker = new mapboxgl.Marker(markerDOM);
      this.marker.setLngLat([lng, lat]);
      this.marker.addTo(this.map);
    } else {
      this.marker.setLngLat([lng, lat]);
    }
  }

  handleMapClick(e) {
    if (this.map.getZoom() === this.props.zoomOutLevel) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    const { lng, lat, zoomInLevel } = this.props;
    this.map.easeTo({
      center: [lng, lat],
      zoom: zoomInLevel
    });
  }

  zoomOut() {
    const { centerLat, centerLng, zoomOutLevel } = this.props;

    this.map.easeTo({
      center: [centerLng, centerLat],
      zoom: zoomOutLevel
    });
  }

  render() {

    return (
      <div className={ style.locationMap } ref={ this.gotRef.bind(this) }/>
    );
  }
}

LocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  mapboxStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  markerEl: PropTypes.element,
  zoomOutLevel: PropTypes.number,
  zoomInLevel: PropTypes.number,
  centerLat: PropTypes.number,
  centerLng: PropTypes.number,
};

LocationMap.defaultProps = {
  mapboxStyle: 'mapbox://styles/mapbox/streets-v10',
  markerEl: null,
  zoomOutLevel: 8,
  zoomInLevel: 13,
  centerLat: 41.85677,
  centerLng: -87.6024055,
};
