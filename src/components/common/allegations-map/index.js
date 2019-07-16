import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import cx from 'classnames';
import { isEmpty, slice, isEqual, values } from 'lodash';
import { isIOS } from 'react-device-detect';
import MultiTouch from 'mapbox-gl-multitouch';

import constants from 'constants';
import { mapboxgl } from 'utils/mapbox';
import Legend from './legend/index';
import MarkerTooltip from './marker-tooltip';
import Marker from './marker';
import styles from './allegations-map.sass';

const MARKERS_PER_PAGE = 200;

export default class AllegationsMap extends Component {
  constructor(props) {
    super(props);
    this.currentMarkers = {};
  }

  componentDidMount() {
    this.loadMarkersPerPages();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.clearAllMarkers) {
      values(this.currentMarkers).forEach(currentMarker => currentMarker.remove());
      this.currentMarkers = {};
      this.addMarkers(nextProps.markers);
    } else {
      if (!isEqual(nextProps.markers, this.props.markers)) {
        this.addMarkers(nextProps.markers);
      }
    }
  }

  loadMarkersPerPages(startIndex=0) {
    const { markers } = this.props;

    slice(markers, startIndex, startIndex + MARKERS_PER_PAGE).forEach(marker => {
      this.addMarker(marker);
    });

    const nextStartIndex = startIndex + MARKERS_PER_PAGE;
    if (nextStartIndex < markers.length) {
      setTimeout(() => {
        this.loadMarkersPerPages(nextStartIndex);
      }, 1);
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: constants.MAPBOX_STYLE,
        zoom: constants.MAP_INFO.ZOOM1,
        center: [constants.MAP_INFO.CENTER_LNG, constants.MAP_INFO.CENTER_LAT],
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      if (isIOS) {
        /* istanbul ignore next */
        this.map.addControl(new MultiTouch());
      }
    }
  }

  createPopup(marker) {
    const popup = new mapboxgl.Popup({ offset: 0, closeButton: false });
    const tooltip = (
      <MarkerTooltip
        date={ marker.date }
        category={ marker.category }
      />
    );
    popup.setHTML(ReactDOMServer.renderToString(tooltip));
    return popup;
  }

  markerUid(marker) {
    return `${ marker.kind }-${ marker.id }`;
  }

  addMarker(marker) {
    if (!isEmpty(this.currentMarkers[this.markerUid(marker)])) {
      return;
    }
    const popup = this.createPopup(marker);

    const markerEl = document.createElement('div');
    markerEl.className = `map-marker ${marker.kind.toLowerCase()}-marker`;
    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.setPopup(popup);
    this.marker.addTo(this.map);
    this.currentMarkers[this.markerUid(marker)] = this.marker;

    ReactDOM.render(
      <Marker
        kind={ marker.kind }
        finding={ marker.finding }
      />,
      markerEl
    );
  }

  addMarkers(markers) {
    markers.forEach(marker => this.addMarker(marker));
  }

  render() {
    const { legend } = this.props;
    return (
      <div className={ cx(styles.map, 'test--map') }>
        <div ref={ this.gotRef.bind(this) } className='map-tab'/>
        <Legend legend={ legend } />
      </div>
    );
  }
}

AllegationsMap.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    unsustainedCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
  markers: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number
        }),
        kind: PropTypes.string,
        finding: PropTypes.string,
        id: PropTypes.string,
        category: PropTypes.string,
        coaccused: PropTypes.number,
        victims: PropTypes.arrayOf(
          PropTypes.shape({
            gender: PropTypes.string,
            race: PropTypes.string,
            age: PropTypes.number,
          })
        )
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number
        }),
        kind: PropTypes.string,
        id: PropTypes.string,
        category: PropTypes.string,
      })
    ),
  ]),
  clearAllMarkers: PropTypes.bool,
};

AllegationsMap.defaultProps = {
  legend: {},
  markers: [],
  clearAllMarkers: true,
};
