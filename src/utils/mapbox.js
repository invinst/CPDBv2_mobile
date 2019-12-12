/* istanbul ignore next */
import _mapboxgl from 'mapbox-gl';
import { spy, stub } from 'sinon';
import config from 'config';
import { includes } from 'lodash';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGplNHMifQ.ky2VSGEYU5KritRMArHY-w';
const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox';
const MARKER_URL = 'https://cpdbv21777.blob.core.windows.net/assets/map-marker.png';

_mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (config.appEnv === 'test' || config.appEnv === 'live-test') {
  const addSourceSpy = spy();
  const getSourceSpy = stub().returns(undefined);
  const addLayerSpy = spy();
  const getLayerSpy = stub().returns(undefined);
  const setFilterSpy = spy();
  const addControlSpy = spy();
  const navigationControlSpy = spy();
  const removeSpy = spy();
  const removeMakerSpy = spy();
  const easeToSpy = spy();
  const getZoomStub = stub();
  const setLngLatStub = stub().returnsThis();
  const setHTMLStub = stub().returnsThis();
  const setPopupStub = stub().returnsThis();
  const addToStub = stub().returnsThis();
  const getBoundingClientRectStub = stub().returns({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const getContainerStub = stub().returns({
    getBoundingClientRect: getBoundingClientRectStub,
  });
  const isStyleLoadedStub = stub();
  const removeLayerSpy = spy();
  const removeSourceSpy = spy();


  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.getSource = getSourceSpy;
      this.getZoom = getZoomStub;
      this.addLayer = addLayerSpy;
      this.easeTo = easeToSpy;
      this.getLayer = getLayerSpy;
      this.setFilter = setFilterSpy;
      this.addControl = addControlSpy;
      this.remove = removeSpy;
      this.getContainer = getContainerStub;
      this.isStyleLoaded = isStyleLoadedStub;
      this.removeLayer = removeLayerSpy;
      this.removeSource = removeSourceSpy;
    }
    on() {
      if (includes(['load', 'idle'], arguments[0])) {
        arguments[arguments.length - 1]();
      }
    }
  }

  class MockMarker {
    constructor(element) {
      this.setLngLat = setLngLatStub;
      this.addTo = addToStub;
      this.setPopup = setPopupStub;
      this.element = element;
      this.remove = removeMakerSpy;
    }
  }

  class MockPopup {
    constructor() {
      this.setLngLat = setLngLatStub;
      this.setHTML = setHTMLStub;
      this.addTo = addToStub;
      this.remove = removeSpy;
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl.Marker = MockMarker;
  _mapboxgl.Popup = MockPopup;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._getSourceSpy = getSourceSpy;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._getLayerSpy = getLayerSpy;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlSpy = addControlSpy;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl.NavigationControl = navigationControlSpy;
  _mapboxgl._setHTMLStub = setHTMLStub;
  _mapboxgl._setLngLatStub = setLngLatStub;
  _mapboxgl._isStyleLoaded = isStyleLoadedStub;
  _mapboxgl._addToStub = addToStub;

  _mapboxgl._resetHistory = () => {
    mapboxgl._addSourceSpy.resetHistory();
    mapboxgl._getSourceSpy.resetHistory();
    mapboxgl._addLayerSpy.resetHistory();
    mapboxgl._getLayerSpy.resetHistory();
    mapboxgl._setFilterSpy.resetHistory();
    mapboxgl._addControlSpy.resetHistory();
    mapboxgl._removeSpy.resetHistory();
    mapboxgl._setLngLatStub.resetHistory();
    mapboxgl._setHTMLStub.resetHistory();
    mapboxgl._addToStub.resetHistory();
    mapboxgl._isStyleLoaded.resetHistory();
  };
}

const getMapUrl = (lat, lon, width, height, mapStyle, zoom) => [
  MAPBOX_API_URL,
  mapStyle,
  'static',
  `url-${encodeURIComponent(MARKER_URL)}(${lon},${lat})`,
  `${lon},${lat},${zoom},0,0`,
  `${width}x${height}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
].join('/');

export const getComplaintMapUrl = (lat, lon, width, height) => {
  return getMapUrl(lat, lon, width, height, 'streets-v10', 12);
};

export const mapboxgl = _mapboxgl;
