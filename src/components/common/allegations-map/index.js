import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import cx from 'classnames';
import { isEmpty, isEqual } from 'lodash';
import { isIOS } from 'react-device-detect';
import MultiTouch from 'mapbox-gl-multitouch';

import { MAPBOX_STYLE, MAP_INFO } from 'constants';
import { mapboxgl } from 'utils/mapbox';
import Legend from './legend/index';
import MarkerTooltip from './marker-tooltip';
import styles from './allegations-map.sass';
import {
  GREYISH_COLOR,
  CHAMPAGNE_COLOR,
  ACCENT_COLOR,
  CLAYGRAY_COLOR,
  BRIGHT_ORANGE_TWO_COLOR,
} from 'constants/colors';
import withLoadingSpinner from 'components/common/with-loading-spinner';


const MAPBOXGL_POINT_STYLE = {
  'circle-radius': 7,
  'circle-stroke-width': 1,
  'circle-color': [
    'match',
    ['get', 'pointType'],
    'FORCE', GREYISH_COLOR,
    'CR', 'white',
    'SUSTAINED-CR', CHAMPAGNE_COLOR,
    'transparent',
  ],
  'circle-stroke-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    ACCENT_COLOR,
    [
      'match',
      ['get', 'pointType'],
      'FORCE', CLAYGRAY_COLOR,
      'CR', BRIGHT_ORANGE_TWO_COLOR,
      'SUSTAINED-CR', BRIGHT_ORANGE_TWO_COLOR,
      'transparent',
    ],
  ],
};

export default class AllegationsMap extends Component {
  constructor(props) {
    super(props);
    this.initMapData();
    this.tooltip = new mapboxgl.Popup({ offset: 0, closeButton: false });
  }

  componentDidMount() {
    this.addMapLayersOnStyleLoaded(this.props.markerGroups);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { legend, markerGroups } = this.props;
    return !isEqual(legend, nextProps.legend) || !isEqual(markerGroups, nextProps.markerGroups);
  }

  componentDidUpdate(prevProps) {
    const { clearAllMarkers, markerGroups } = this.props;
    if (clearAllMarkers) {
      this.resetMap();
      this.addMapLayersOnStyleLoaded(markerGroups);
    } else {
      if (!isEqual(prevProps.markerGroups, markerGroups)) {
        this.addMapLayersOnStyleLoaded(markerGroups);
      }
    }
  }

  gotRef = (el) => {
    const { attributionControlPosition } = this.props;
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: MAPBOX_STYLE,
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        attributionControl: false,
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.AttributionControl(), attributionControlPosition);
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      if (isIOS) {
        /* istanbul ignore next */
        this.map.addControl(new MultiTouch());
      }
    }
  };

  getUrl(marker) {
    if (marker.kind === 'CR') {
      return `/complaint/${marker.id}/`;
    } else if (marker.kind === 'FORCE') {
      return `/trr/${marker.id}/`;
    }
  }

  markerUid(marker) {
    return `${ marker.kind }-${ marker.id }`;
  }

  openTooltip = e => {
    const eventFeature = e.features[0];
    const coordinates = eventFeature.geometry.coordinates.slice();
    const markerProperties = eventFeature.properties;

    const tooltip = (
      <MarkerTooltip
        date={ markerProperties.date }
        category={ markerProperties.category }
        url={ markerProperties.url }
      />
    );

    this.tooltip.setLngLat(coordinates)
      .setHTML(ReactDOMServer.renderToString(tooltip))
      .addTo(this.map);
  };

  mapMarkersData(markers) {
    const data = [];
    (markers || []).forEach((marker, index) => {
      const markerUid = this.markerUid(marker);
      if (!this.currentMarkers.has(markerUid)) {
        this.currentMarkers.add(markerUid);
        data.push({
          type: 'Feature',
          properties: {
            id: marker.id,
            kind: marker.kind,
            pointType: marker.pointType || marker.kind,
            date: marker.date,
            category: marker.category,
            url: this.getUrl(marker),
          },
          geometry: {
            type: 'Point',
            coordinates: [marker.point.lon, marker.point.lat],
          },
          id: index,
        });
      }
    });
    return data;
  }

  initMapData() {
    this.layerNames = [];
    this.currentMarkers = new Set();
    this.mapboxglLayerIndex = 0;
    this.firstLayer = {};
  }

  resetMap() {
    if (this.map.isStyleLoaded()) {
      this.layerNames.forEach((layerName) => {
        this.map.removeLayer(layerName);
        this.map.removeSource(layerName);
      });
    }
    this.initMapData();
  }

  addMapLayersOnStyleLoaded(markerGroups) {
    if (this.map.isStyleLoaded()) {
      this.addMapLayers(markerGroups);
    } else {
      this.map.on('idle', () => this.addMapLayers(markerGroups));
    }
  }

  addMapLayers(markerGroups) {
    Object.keys(markerGroups).forEach(
      (layerType) => this.addMapLayer(layerType, markerGroups[layerType])
    );
  }

  addMapLayer(layerType, markers) {
    const markersData = this.mapMarkersData(markers);
    if (isEmpty(markersData))
      return;

    const layerName = `layer-${this.mapboxglLayerIndex}`;

    this.map.addSource(layerName, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markersData,
      },
    });

    const aboveLayerName = layerType !== 'trrs' ? this.firstLayer['trrs'] || this.firstLayer[layerType] : undefined;
    this.map.addLayer({
      id: layerName,
      type: 'circle',
      paint: MAPBOXGL_POINT_STYLE,
      source: layerName,
    }, aboveLayerName);

    if (!this.firstLayer[layerType]) {
      this.firstLayer[layerType] = layerName;
    }

    this.layerNames.push(layerName);
    this.map.on('click', layerName, this.openTooltip);

    this.mapboxglLayerIndex += 1;
  }

  render() {
    const { legend } = this.props;
    return (
      <div className={ cx(styles.map, 'test--map') }>
        <div ref={ this.gotRef } className='map-tab'/>
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
    useOfForceCount: PropTypes.number,
  }),
  markerGroups: PropTypes.shape({
    crs: PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
        kind: PropTypes.string,
        pointType: PropTypes.string,
        finding: PropTypes.string,
        id: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
      })
    ),
    trrs: PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
        kind: PropTypes.string,
        id: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
      })
    ),
  }),
  clearAllMarkers: PropTypes.bool,
  attributionControlPosition: PropTypes.string,
};

AllegationsMap.defaultProps = {
  legend: {},
  markerGroups: {
    crs: [],
    trrs: [],
  },
  clearAllMarkers: true,
  attributionControlPosition: 'bottom-right',
};

export const AllegationsMapWithSpinner = withLoadingSpinner(AllegationsMap, styles.allegationMapLoading);
