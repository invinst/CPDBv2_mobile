import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import style from './location-map.sass';
import { mapboxgl } from 'utils/mapbox';


const scrollTopMargin = 40; // this value depends on the height of Header

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.prevTop = 0;
    this.prevBottom = 0;
  }

  componentDidMount() {
    /* istanbul ignore next */
    addEventListener('scroll', this.handleScroll);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng, zoomInLevel } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng, nextProps.customMarkerClassName);

      if (this.map.getZoom() === zoomInLevel) {
        this.zoomOut();
      }
    }
  }

  componentWillUnmount() {
    /* istanbul ignore next */
    removeEventListener('scroll', this.handleScroll);
  }

  isValidLocation(lat, lng) {
    return !isNil(lat) && !isNil(lng);
  }

  gotRef(el) {
    if (el && !this.map) {
      const { lat, lng, mapboxStyle, customMarkerClassName, zoomOutLevel, centerLng, centerLat } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: mapboxStyle,
        zoom: zoomOutLevel,
        center: [centerLng, centerLat],
        interactive: false,
      });
      this.map.on('click', this.handleMapClick.bind(this));
      this.addMarker(lat, lng, customMarkerClassName);
    }
  }

  addMarker(lat, lng, customMarkerClassName) {
    if (this.marker && this.isValidLocation(lat, lng)) {
      this.marker.setLngLat([lng, lat]);
    } else if (this.marker) {
      this.marker.remove();
      this.marker = null;
    } else if (this.isValidLocation(lat, lng)) {
      const markerEl = document.createElement('div');
      markerEl.className = customMarkerClassName || 'default-marker';

      this.marker = new mapboxgl.Marker(markerEl);
      this.marker.setLngLat([lng, lat]);
      this.marker.addTo(this.map);
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
    if (this.isValidLocation(lat, lng)) {
      this.map.easeTo({
        center: [lng, lat],
        zoom: zoomInLevel,
      });
    }
  }

  zoomOut() {
    const { centerLat, centerLng, zoomOutLevel } = this.props;
    this.map.easeTo({
      center: [centerLng, centerLat],
      zoom: zoomOutLevel,
    });
  }

  handleScroll(event) {
    /* istanbul ignore next */
    // Logic: zoom in the map if it closes to top or bottom of the current window
    if (this.map) {
      const { top, bottom } = this.map.getContainer().getBoundingClientRect();
      const isScrollDown = top - this.prevTop < 0 || this.prevTop == 0;
      const bottomCrossed = (this.prevBottom != 0) &&
        (this.prevBottom - window.innerHeight) * (bottom - window.innerHeight) <= 0;
      const topCrossed = (this.prevTop != 0) && (top - scrollTopMargin) * (this.prevTop - scrollTopMargin) <= 0;

      if (isScrollDown && (bottomCrossed || topCrossed)) {
        this.zoomIn();
      }

      if (!isScrollDown && (bottomCrossed || topCrossed)) {
        this.zoomOut();
      }

      this.prevTop = top;
      this.prevBottom = bottom;
    }
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
  customMarkerClassName: PropTypes.string,
  zoomOutLevel: PropTypes.number,
  zoomInLevel: PropTypes.number,
  centerLat: PropTypes.number,
  centerLng: PropTypes.number,
};

LocationMap.defaultProps = {
  mapboxStyle: 'mapbox://styles/mapbox/streets-v10',
  zoomOutLevel: 8,
  zoomInLevel: 13,
  centerLat: 41.85677,
  centerLng: -87.6024055,
};
